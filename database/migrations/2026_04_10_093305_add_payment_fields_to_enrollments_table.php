<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            $table->foreignId('payment_id')->nullable()->constrained('payments')->nullOnDelete()->after('batch_id');
            $table->decimal('amount', 12, 2)->nullable()->after('payment_id');
            $table->string('currency', 10)->default('INR')->after('amount');
        });
    }

    public function down(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            $table->dropForeign(['payment_id']);
            $table->dropColumn(['payment_id', 'amount', 'currency']);
        });
    }
};
