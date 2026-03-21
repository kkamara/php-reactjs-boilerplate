<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HealthController extends Controller
{
    public function health(): JsonResponse
    {
        return response()->json([
            "message" => "Success"
        ], 200);
    }
}
