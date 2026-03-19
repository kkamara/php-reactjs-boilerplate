<?php

namespace App\Http\Controllers\Mobile\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class MobileController extends Controller
{
    public function hello(): JsonResponse
    {
        return response()->json([
            "message" => "Hello from the PHP server."
        ]);
    }
}
