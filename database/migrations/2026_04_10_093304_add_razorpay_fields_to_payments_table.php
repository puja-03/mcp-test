<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->foreignId('course_id')->nullable()->constrained()->nullOnDelete()->after('enrollment_id');
            $table->string('razorpay_order_id')->nullable()->after('transaction_id');
            $table->string('razorpay_payment_id')->nullable()->after('razorpay_order_id');
            $table->string('razorpay_signature')->nullable()->after('razorpay_payment_id');
            $table->string('currency', 10)->default('INR')->after('amount');
        });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['course_id']);
            $table->dropColumn(['course_id', 'razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature', 'currency']);
        });
    }
};
