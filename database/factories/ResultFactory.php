<?php

namespace Database\Factories;

use App\Models\Result;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Result>
 */
class ResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'marks_obtained' => fake()->numberBetween(30, 100),
            'remarks' => fake()->randomElement(['Excellent', 'Good', 'Average', 'Need Improvement', null]),
            'status' => 'published',
        ];
    }
}
