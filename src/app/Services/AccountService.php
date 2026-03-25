<?php

namespace App\Services;

use App\Models\Stats;

class AccountService
{

    public function updateStats(int $id, bool $isEncryption = true): void
    {
        $column = $isEncryption ? 'total_encryption' : 'total_decryption';

        Stats::incrementOrCreate(
            ['user_id' => $id],
            $column
        );
    }

    public function getStats(int $id): array {
        return Stats::where('user_id', $id)->first()->toArray();
    }
}
