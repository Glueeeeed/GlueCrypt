<?php

namespace App\Http\Controllers;

use App\Services\AccountService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function updateStats(Request $request) : JsonResponse
    {
        $request->validate([
            'isEncryption' => 'required|boolean',
        ]);
        $accountService = new AccountService;
        $accountService->updateStats($request->attributes->get('userID'), $request->isEncryption);
        return response()->json(['success' => true]);
    }
}
