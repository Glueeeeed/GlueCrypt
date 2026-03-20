<?php

namespace App\Http\Controllers;

use app\Models\History;
use App\Services\HistoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use PHPUnit\Exception;

class HistoryController extends Controller
{
    public function store(Request $request) : JsonResponse {
        try {
            $validated = $request->validate([
                'user_id' => 'required|string',
                'key_size' => 'required|integer',
                'encrypted_key' => 'required|string',
                'encrypted_text' => 'required|string',
                'keyNonce' => 'required|string',
                'textNonce' => 'required|string',
                'operation_salt' => 'required|string',
            ]);


            $history = new HistoryService();
            $history->saveToHistory($validated);

            return response()->json([
                'message' => 'Saved successfully',
            ], 201);



        } catch (Exception $e) {
            Log::error($e);
            return response()->json([
                "error" => "Server Internal Error"
            ], 500);
        }
    }
}
