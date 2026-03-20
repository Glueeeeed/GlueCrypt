<?php

namespace app\Models;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class History extends EloquentModel
{
    protected $table = 'history';
    public $timestamps = true;

    const UPDATED_AT = null;

    protected $fillable = [
        "user_id",
        "key_size",
        "encrypted_key",
        "encrypted_text",
        "keyNonce",
        "textNonce",
        "operation_salt",
        "created_at",
    ];
}
