<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stats extends Model
{
    protected $table = 'stats';

    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'total_decryption',
        'total_encryption',
    ];
}
