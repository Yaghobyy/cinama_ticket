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
        Schema::create('show_times', function (Blueprint $table) {
            $table->id();
            // ارتباط با فیلم
            $table->foreignId('movie_id')
                ->constrained('movies')
                ->cascadeOnDelete();

            // تاریخ و ساعت سانس
            $table->date('show_date');       // تاریخ سانس
            $table->time('start_time');      // زمان شروع
            $table->time('end_time');        // زمان پایان 

            // قیمت بلیط
            $table->bigInteger('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('show_times');
    }
};
