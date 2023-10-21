<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Web\UserController as WebUserController;

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

Route::prefix('web')
    ->group(function() {
        // Add single page app api routes
        Route::prefix('/user')->group(function () {
            Route::post('/register', [WebUserController::class,'register']);
            Route::post('/', [WebUserController::class,'login']);
            Route::delete('/logout', [WebUserController::class,'logout']);
            Route::get('/authorize', [WebUserController::class,'authorizeUser']);
        });
        Route::get('/users', [WebUserController::class,'getUsers']);
    });

Route::prefix('/user')->group(function () {
    Route::post('/register', [UserController::class,'register']);
    Route::post('/', [UserController::class,'login'])->name('login');
    Route::delete('/logout', [UserController::class,'logout']);
    Route::get('/authorize', [UserController::class,'authorizeUser']);
});
