<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);
        return [
            'tenant_id' => \App\Models\Tenant::first()->id ?? 1,
            'user_id' => \App\Models\User::first()->id ?? 1,
            'name' => ucwords($name),
            'slug' => \Illuminate\Support\Str::slug($name),
            'code' => strtoupper(fake()->bothify('??-###')),
            'description' => fake()->paragraph(),
            'duration_months' => fake()->numberBetween(1, 12),
            'total_fees' => fake()->randomFloat(2, 500, 50000),
            'is_published' => fake()->boolean(80),
            'is_active' => true,
        ];
    }
}
