<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Mail\ExampleMail;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendEmail(Request $request): JsonResponse {
        Mail::to([
            "bar@example.com",
            "baz@example.com",
        ])->send(new ExampleMail("Test Email ✔"));

        return response()->json([
            "message" => "Message sent.",
        ]);
    }
}
