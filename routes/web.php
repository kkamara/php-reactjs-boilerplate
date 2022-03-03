<?php

use Illuminate\Support\Facades\Route;

Route::view('/{path?}', 'layouts.app')->where('path', '.*');

Route::fallback(function() {
    return abort(404);
});
