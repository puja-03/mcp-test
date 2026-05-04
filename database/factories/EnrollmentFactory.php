<?php

namespace Database\Factories;

use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\Payment;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Enrollment>
 */
class EnrollmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tenant_id' => Tenant::first()->id ?? 1,
            'student_id' => User::factory(),
            'batch_id' => Batch::factory(),
            'enrollment_date' => fake()->dateTimeBetween('-6 months', 'now'),
            'status' => 'active',
            'amount' => fake()->randomFloat(2, 5000, 20000),
            'currency' => 'INR',
        ];
    }
}
