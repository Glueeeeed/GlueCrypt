<?php

use App\Services\HistoryService;
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
    $historyService = new HistoryService;
    $data = $historyService->getHistory($request->attributes->get('userID'));
    return Inertia::render('gluecrypt_account', [
        'userID' => $request->attributes->get('userID'),
        'history' => $data
    ]);
})->middleware(JwtMiddleware::class);

Route::get('/gluecrypt/account/history/{id}', function ($id, Illuminate\Http\Request $request) {


    // dodac potem zabezpieczenie by tylko autor tej operacji mogl to wyswietlic


    $historyService = new HistoryService;
    if (!$historyService->verifyUser($request->attributes->get('userID'), $id)) {
        return response()->json([
            "error" => "unauthorized"
        ], 401);
    }
    Log::info(json_encode($historyService->getOperationDetails($id)));
    return Inertia::render('gluecrypt_history', [
        'details' => $historyService->getOperationDetails($id),
        'baseKey' => $request->attributes->get('jwt_decoded'),
    ]);
})->middleware(JwtMiddleware::class);

Route::post('/gluecrypt/api/history', [HistoryController::class, 'store']);



