<?php

namespace Database\Factories;

use App\Models\ClassSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ClassSession>
 */
class ClassSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startTime = fake()->dateTimeBetween('-1 month', '+1 month');
        $endTime = (clone $startTime)->modify('+2 hours');

        return [
            'session_date' => $startTime->format('Y-m-d'),
            'topic' => fake()->sentence(),
            'start_time' => $startTime->format('H:i:s'),
            'end_time' => $endTime->format('H:i:s'),
        ];
    }
}
