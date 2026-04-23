<?php

namespace Database\Factories;

use App\Models\InstructorProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<InstructorProfile>
 */
class InstructorProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'specialization' => $this->faker->jobTitle(),
            'experience_years' => $this->faker->numberBetween(1, 20),
            'education' => $this->faker->sentence(10),
            'skills' => [$this->faker->word(), $this->faker->word(), $this->faker->word()],
            'bio' => $this->faker->paragraph(3),
            'website' => $this->faker->url(),
            'twitter' => 'https://twitter.com/' . $this->faker->userName(),
            'linkedin' => 'https://linkedin.com/in/' . $this->faker->userName(),
        ];
    }
}
