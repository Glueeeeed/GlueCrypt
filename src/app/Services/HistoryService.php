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
            'operation_id' => base64_encode(random_bytes(8)),
            'algorithm' => $history['algorithm'],
            'key_size' => $history['key_size'],
            'encrypted_key' => $history['encrypted_key'],
            'encrypted_text' => $history['encrypted_text'],
            'keyNonce' => $history['keyNonce'],
            'textNonce' => $history['textNonce'],
            'operation_salt' => $history['operation_salt'],
        ]);
    }

    public function getOperationDetails($operationID): array {
        $data = History::where('operation_id', $operationID)
            ->get()
            ->toArray();

        return $data;
    }

    public function getHistory(string $id) : array {
        $data = History::where('user_id', $id)
            ->latest('created_at')
            ->get(['created_at', 'operation_id'])
            ->toArray();

        Log::info("DATA" . json_encode($data));

        return $data;
    }



}
