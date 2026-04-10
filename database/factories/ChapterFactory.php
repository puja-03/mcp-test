<?php

namespace Database\Factories;

use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChapterFactory extends Factory
{
    protected $model = Chapter::class;

    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'chapter_title' => ucwords(fake()->words(3, true)),
            'order_index' => fake()->numberBetween(1, 10),
        ];
    }
}
