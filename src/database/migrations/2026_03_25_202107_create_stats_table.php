<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('stats', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->integer('total_decryption');
            $table->integer('total_encryption');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stats');
    }
};
