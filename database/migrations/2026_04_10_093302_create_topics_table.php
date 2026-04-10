<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('topics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chapters_id')->constrained('chapters')->cascadeOnDelete();
            $table->string('topic_title');
            $table->string('topic_slug');
            $table->longText('content')->nullable();
            $table->string('video_url')->nullable();
            $table->integer('order_index')->default(0);
            $table->boolean('is_completed')->default(false);
            $table->json('attachments')->nullable();
            $table->timestamps();

            $table->unique(['chapters_id', 'topic_slug']);
            $table->index(['chapters_id', 'order_index']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('topics');
    }
};
