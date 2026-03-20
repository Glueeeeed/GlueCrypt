<?php

namespace App\Services;

use app\Models\History;
use Illuminate\Support\Facades\Log;

class HistoryService
{

    public function saveToHistory(array $history): void {

        Log::info("Saving history to database");
        History::create([
            'user_id' => $history['user_id'],
            'key_size' => $history['key_size'],
            'encrypted_key' => $history['encrypted_key'],
            'encrypted_text' => $history['encrypted_text'],
            'keyNonce' => $history['keyNonce'],
            'textNonce' => $history['textNonce'],
            'operation_salt' => $history['operation_salt'],
        ]);
    }
}
