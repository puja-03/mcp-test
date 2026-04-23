<?php

namespace Database\Factories;

use App\Models\FeeStructure;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FeeStructure>
 */
class FeeStructureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true) . ' Plan',
            'total_amount' => fake()->randomFloat(2, 5000, 50000),
            'installment_count' => fake()->numberBetween(1, 12),
        ];
    }
}
