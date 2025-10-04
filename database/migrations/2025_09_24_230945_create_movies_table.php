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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('poster');
            $table->text('description')->nullable();
            $table->string('language')->nullable();
            $table->string('director')->nullable(); // کارگردان
            $table->integer('duration')->nullable();
            $table->integer('release_year')->nullable(); // سال انتشار
            $table->string('country')->nullable(); // کشور تولید
            $table->decimal('rating', 3, 1)->default(0); // امتیاز (مثلاً 7.5)
            $table->integer('votes')->default(0); // تعداد رأی‌ها
            $table->string('trailer_url')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
