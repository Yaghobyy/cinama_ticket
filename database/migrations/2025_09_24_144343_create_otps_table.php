<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('otps', function (Blueprint $table) {
            $table->id();
            $table->string('mobile')->index(); // شماره موبایل کاربر
            $table->string('otp')->unique(); // کد OTP تولید شده
            $table->boolean('is_used')->default(false); // آیا OTP استفاده شده؟
            $table->timestamp('expires_at'); // زمان انقضای OT
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('otps');
    }
};
