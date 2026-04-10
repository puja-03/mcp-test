<?php

namespace Database\Factories;

use App\Models\Chapter;
use App\Models\Topic;
use Illuminate\Database\Eloquent\Factories\Factory;

class TopicFactory extends Factory
{
    protected $model = Topic::class;

    public function definition(): array
    {
        $videoUrls = [
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'https://www.youtube.com/watch?v=ok-plXXHlWw',
            'https://www.youtube.com/watch?v=fYq5PXgSsbE',
            'https://www.youtube.com/watch?v=SqcY0GlETPk',
            'https://www.youtube.com/watch?v=vmEHCJofslg',
            null,
        ];

        return [
            'chapters_id' => Chapter::factory(),
            'topic_title' => ucwords(fake()->words(4, true)),
            'content' => fake()->paragraphs(3, true),
            'video_url' => fake()->randomElement($videoUrls),
            'order_index' => fake()->numberBetween(1, 20),
        ];
    }
}
