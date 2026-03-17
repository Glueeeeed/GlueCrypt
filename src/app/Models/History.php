<?php

namespace App\Models;

class History
{
    protected $table = 'history';
    protected $fillable = [
        'user_id',
        'key_size',
        'encrypted_key',
        'encrypted_text',
    ];
}
