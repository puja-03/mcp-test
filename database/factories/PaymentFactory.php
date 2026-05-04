<?php

namespace Database\Factories;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tenant_id' => \App\Models\Tenant::first()->id ?? 1,
            'amount' => fake()->randomFloat(2, 100, 10000),
            'currency' => 'INR',
            'payment_date' => fake()->date(),
            'payment_method' => fake()->randomElement(['Cash', 'Online', 'Bank Transfer']),
            'status' => fake()->randomElement(['Completed', 'Pending', 'Failed']),
            'transaction_id' => strtoupper(fake()->bothify('TXN-#####-#####')),
            'receipt_number' => strtoupper(fake()->bothify('RCP-#####')),
            'razorpay_order_id' => 'order_' . fake()->bothify('??????????????'),
            'razorpay_payment_id' => 'pay_' . fake()->bothify('??????????????'),
            'notes' => fake()->sentence(),
        ];
    }
}
