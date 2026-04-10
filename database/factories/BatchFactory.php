<?php

namespace Database\Factories;

use App\Models\Batch;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Batch>
 */
class BatchFactory extends Factory
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
            'course_id' => \App\Models\Course::factory(),
            'name' => 'Batch ' . strtoupper(fake()->bothify('??-###')),
            'start_date' => fake()->dateTimeBetween('-1 month', '+1 month'),
            'end_date' => fake()->dateTimeBetween('+6 months', '+12 months'),
            'status' => 'active',
        ];
    }
}
