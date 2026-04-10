<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('name');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete()->after('tenant_id');
            $table->boolean('is_published')->default(false)->after('is_active');
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn(['slug', 'user_id', 'is_published']);
        });
    }
};
