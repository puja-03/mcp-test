<?php

namespace Database\Factories;

use App\Models\Enrollment;
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
            'tenant_id' => \App\Models\Tenant::first()->id ?? 1,
            'student_id' => \App\Models\User::factory(),
            'batch_id' => \App\Models\Batch::factory(),
            'enrollment_date' => fake()->dateTimeBetween('-6 months', 'now'),
            'status' => 'active',
            'amount' => fake()->randomFloat(2, 5000, 20000),
            'currency' => 'INR',
        ];
    }
}
