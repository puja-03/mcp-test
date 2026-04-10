<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chapters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('chapter_title');
            $table->string('chapter_slug');
            $table->integer('order_index')->default(0);
            $table->boolean('is_completed')->default(false);
            $table->json('attachments')->nullable();
            $table->timestamps();

            $table->unique(['course_id', 'chapter_slug']);
            $table->index(['course_id', 'order_index']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chapters');
    }
};
