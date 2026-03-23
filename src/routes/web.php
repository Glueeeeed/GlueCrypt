<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\HistoryController;

Route::get('/gluecrypt', function (Illuminate\Http\Request $request) {
    return Inertia::render('gluecrypt', [
        'baseKey' => $request->attributes->get('jwt_decoded'),
        'userID' => $request->attributes->get('userID')
    ]);
})->middleware(JwtMiddleware::class);

Route::get('/gluecrypt/account', function (Illuminate\Http\Request $request) {
    $historyController = new HistoryController;
    $data = $historyController->getHistory($request->attributes->get('userID'));
    return Inertia::render('gluecrypt_account', [
        'userID' => $request->attributes->get('userID'),
        'history' => $data
    ]);
})->middleware(JwtMiddleware::class);

Route::get('/gluecrypt/account/history', function () {
    return Inertia::render('gluecrypt_history');
})->middleware(JwtMiddleware::class);

Route::post('/gluecrypt/api/history', [HistoryController::class, 'store']);



