<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;

class UserController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make(
            $request->only([
                "name", "email", "password", "password_confirmation",
            ]),
            [
                "name" => "required|min:3|max:30",
                "email" => "required|email|max:255|unique:users",
                "password" => "required|confirmed|min:6|max:30",
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                $validator->errors(),
                Response::HTTP_BAD_REQUEST,
            );
        }
        if (
            null !== User::where(
                $request->only("email"),
            )->first()
        ) {
            return response()->json([
                "email" => __(
                    "validation.exists",
                    ["attribute" => "email"],
                ),
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = (new User())->tap(function(User $user) use ($request) {
            $user->name = htmlspecialchars(trim($request->input("name")));
            $user->email = filter_var(trim($request->input("email")), FILTER_SANITIZE_EMAIL);
            $user->password = Hash::make(htmlspecialchars(trim($request->input("password"))));
            $user->save();
            $user->token = $user->createToken("token")->plainTextToken;
        });

        return response()->json([
            "data" => new UserResource($user),
        ], Response::HTTP_CREATED);
    }

    public function login(Request $request) {
        $validation = Validator::make(
            $request->only(["email", "password"]),
            [
                "email" => "required|email|max:255",
                "password" => "required|min:6|max:30",
            ],
        );
        if($validation->fails()) {
            return response()->json(
                $validation->errors(),
                Response::HTTP_BAD_REQUEST,
            );
        }
        $cleanEmailInput = filter_var(trim(
            $request->input("email")),
            FILTER_SANITIZE_EMAIL,
        );
        if (
            !Auth::attempt([
                "email" => $cleanEmailInput,
                "password" => htmlspecialchars(trim(
                    $request->input("password"),
                )),
            ])
        ) {
            return response()->json([
                "error" => __(
                    "validation.invalid_duo_combination",
                    [
                        "attribute" => "name",
                        "attribute2" => "password",
                    ]
                ),
            ], Response::HTTP_BAD_REQUEST);
        }
        $user = User::where($request->only("email"))
            ->firstOrFail();
        $user->tap(function(User $user) {
            $user->token = $user->createToken("token")->plainTextToken;
        });
        return response()->json([
            "data" => new UserResource($user),
        ], Response::HTTP_OK);
    }

    public function authorizeUser(Request $request) {
        $user = User::where(
            "email",
            $request->user()->email,
        )->firstOrFail();

        return response()->json([
            "data" => new UserResource($user),
        ], Response::HTTP_ACCEPTED);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return ["message" => "Success"];
    }

    public function getUsers(Request $request) {
        $data = User::orderBy("id", "DESC")
            ->paginate(7)
            ->appends($request->query());

        return new UserCollection($data);
    }
}
