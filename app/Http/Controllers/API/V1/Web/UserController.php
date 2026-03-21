<?php

namespace App\Http\Controllers\API\V1\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Models\V1\User;
use App\Http\Resources\V1\UserResource;

class UserController extends Controller
{
    public function register(Request $request): JsonResponse {
        $validator = Validator::make(
            $request->only([
                "firstName", "lastName", "email", "password", "passwordConfirmation",
            ]),
            [
                "firstName" => "required|min:3|max:30",
                "lastName" => "required|min:3|max:30",
                "email" => "required|email|max:255|unique:users",
                "password" => "required|confirmed:passwordConfirmation|min:6|max:30",
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                $validator->errors(),
                Response::HTTP_BAD_REQUEST,
            );
        }
        $cleanEmailInput = filter_var(
            trim($request->input("email")),
            FILTER_SANITIZE_EMAIL,
        );
        if (
            null !== User::where(
                ["email" => $cleanEmailInput],
            )->first()
        ) {
            return response()->json([
                "email" => __(
                    "V1/validation.exists",
                    ["attribute" => "email"],
                ),
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = (new User())->tap(function(User $user) use ($request) {
            $user->first_name = htmlspecialchars(trim($request->input("firstName")));
            $user->last_name = htmlspecialchars(trim($request->input("lastName")));
            $user->email = filter_var(trim($request->input("email")), FILTER_SANITIZE_EMAIL);
            $user->password = Hash::make(htmlspecialchars(trim($request->input("password"))));
            $user->save();
            $user->token = $user->createToken("token")->plainTextToken;
        });

        return response()->json([
            "user" => new UserResource($user),
        ], Response::HTTP_CREATED);
    }

    public function login(Request $request): JsonResponse|UserResource {
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
        $cleanEmailInput = filter_var(
            trim($request->input("email")),
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
                    "V1/validation.invalid_duo_combination",
                    [
                        "attribute" => "name",
                        "attribute2" => "password",
                    ]
                ),
            ], Response::HTTP_BAD_REQUEST);
        }
        $user = User::where(["email" => $cleanEmailInput])
            ->firstOrFail();
        $user->tap(function(User $user) {
            $user->token = $user->createToken("token")->plainTextToken;
        });
        return response()->json([
            "data" => [
                "user" => new UserResource($user)
            ]
        ]);
    }

    public function authorizeUser(Request $request): JsonResponse|UserResource {
        $cleanEmailInput = filter_var(
            trim($request->user()->email),
            FILTER_SANITIZE_EMAIL,
        );
        $user = User::where(
            "email",
            $cleanEmailInput,
        )->firstOrFail();

        return response()->json([
            "user" => new UserResource($user)
        ]);
    }

    public function logout(Request $request): JsonResponse {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            "message" => "Success",
        ]);
    }
}
