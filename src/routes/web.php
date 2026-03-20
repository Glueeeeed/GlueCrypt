<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\HistoryController;

Route::get('/gluecrypt', function (Illuminate\Http\Request $request) {
    return Inertia::render('gluecrypt', [
        'baseKey' => $request->attributes->get('jwt_decoded')
    ]);
})->middleware(JwtMiddleware::class);

Route::get('/gluecrypt/account', function () {
    return Inertia::render('gluecrypt_account');
})->middleware(JwtMiddleware::class);

Route::post('/gluecrypt/api/history', [HistoryController::class, 'store']);



