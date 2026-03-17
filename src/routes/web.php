<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\JwtMiddleware;

Route::get('/gluecrypt', function () {
    return Inertia::render('gluecrypt');
})->middleware(JwtMiddleware::class);

Route::get('/gluecrypt/account', function () {
    return Inertia::render('gluecrypt_account');
})->middleware(JwtMiddleware::class);
