<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Mail\Test as TestMail;
use Illuminate\Support\Facades\Mail;

Route::get('/email', function () {
    Log::debug('test');
    
    $email = new TestMail();
    Mail::to('recipient@localhost')->send($email);
    return $email;
});

Route::view('/{path?}', 'layouts.app')->where('path', '.*');

Route::fallback(function() {
    return abort(404);
});
