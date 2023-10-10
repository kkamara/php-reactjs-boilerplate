<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('/user')->group(function () {
    Route::post('/register', [UserController::class,'register']);
    Route::post('/', [UserController::class,'login'])->name('login');
    Route::delete('/logout', [UserController::class,'logout']);
    Route::get('/authorize', [UserController::class,'authorizeUser']);
});
