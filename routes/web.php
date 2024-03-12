<?php

use Illuminate\Support\Facades\Route;

Route::view('/{path?}', 'layouts.app')->where('path', '.*');
