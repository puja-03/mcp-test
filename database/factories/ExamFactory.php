<?php

namespace Database\Factories;

use App\Models\Exam;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Exam>
 */
class ExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => ucwords(fake()->words(3, true)) . ' Assessment',
            'max_marks' => fake()->randomElement([50, 100, 150, 200]),
            'passing_marks' => 40,
            'exam_date' => fake()->dateTimeBetween('-1 month', '+2 months'),
        ];
    }
}
