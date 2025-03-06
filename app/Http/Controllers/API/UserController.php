<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use App\Models\User;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make(
            $request->only([
                'name', 'email', 'password', 'password_confirmation',
            ]),
            [
                'name' => 'required',
                'email' => 'required',
                'password' => 'required|confirmed',
            ]
        );
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        if (null !== User::where($request->only('email'))->first()) {
            return response()->json(['email' => 'User with that email already exists'], Response::HTTP_BAD_REQUEST);
        }
        
        $user = (new User())->tap(function(User $user) use ($request) {
            $user->name = htmlspecialchars(trim($request->input('name')));
            $user->email = filter_var(trim($request->input('email')), FILTER_SANITIZE_EMAIL);
            $user->password = Hash::make(htmlspecialchars(trim($request->input('password'))));
            $user->save();
            $user->token = $user->createToken('token')->plainTextToken;
        });
     
        return response()->json([
            'data' => new UserResource($user)
        ], Response::HTTP_CREATED);
    }

    function login(Request $request) {
        $validation = Validator::make(
            $request->only(['email', 'password',]),
            ['email' => 'required|email', 'password' => 'required',],
        );
        if($validation->fails()) {
            return response()->json($validation->errors(), Response::HTTP_BAD_REQUEST);
        }
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                'error' => 'Invalid email and password combination',
            ], Response::HTTP_BAD_REQUEST);
        }
        $user = User::where($request->only('email'))->firstOrFail();
        $user->tap(function(User $user) {
            $user->token = $user->createToken('token')->plainTextToken;
        });
        return [
            'data' => new UserResource($user)
        ];
    }

    function authorizeUser(Request $request) {
        $user = User::where('email', $request->user()->email)->firstOrFail();

        return [
            'data' => new UserResource($user)
        ];
    }

    function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return ['message' => 'Success'];
    }
}
