<?php

use App\Enums\PaymentStatusEnum;
use App\Enums\PaymentMethodEnum;
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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->onDelete('cascade');
            $table->bigInteger('amount'); 
            $table->string('status')->default(PaymentStatusEnum::PENDING); // pending, paid, failed, refunded
            $table->string('method')->default(PaymentMethodEnum::GATEWAY); // card, wallet, gateway
            $table->string('transaction_id')->nullable(); // شماره تراکنش از درگاه
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
