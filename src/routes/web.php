<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\JwtMiddleware;

Route::get('/', function () {
    return Inertia::render('gluecrypt');
})->middleware(JwtMiddleware::class);
