<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\Topic;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;

class LmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenant = Tenant::where('domain', 'global')->first();
        $instructor = User::where('email', 'instructor@example.com')->first();

        // 1. Full Stack Web Development
        $course1 = Course::updateOrCreate(
            ['tenant_id' => $tenant->id, 'name' => 'Full Stack Web Development'],
            [
                'user_id' => $instructor->id,
                'slug' => 'full-stack-web-development',
                'code' => 'CS-101',
                'description' => 'Master React, Node.js, and SQL by building real-world applications.',
                'is_published' => true,
                'total_fees' => 15000.00,
                'duration_months' => 6,
            ]
        );

        $ch1 = Chapter::updateOrCreate(
            ['tenant_id' => $tenant->id, 'course_id' => $course1->id, 'chapter_title' => 'HTML & CSS Basics'],
            ['order_index' => 1]
        );
        Topic::updateOrCreate(
            ['tenant_id' => $tenant->id, 'chapters_id' => $ch1->id, 'topic_title' => 'Introduction to HTML'],
            ['video_url' => 'https://www.youtube.com/watch?v=ok-plXXHlWw', 'order_index' => 1]
        );
        Topic::updateOrCreate(
            ['tenant_id' => $tenant->id, 'chapters_id' => $ch1->id, 'topic_title' => 'CSS Flexbox Guide'],
            ['video_url' => 'https://www.youtube.com/watch?v=fYq5PXgSsbE', 'order_index' => 2]
        );

        $ch2 = Chapter::updateOrCreate(
            ['tenant_id' => $tenant->id, 'course_id' => $course1->id, 'chapter_title' => 'React Fundamentals'],
            ['order_index' => 2]
        );
        Topic::updateOrCreate(
            ['tenant_id' => $tenant->id, 'chapters_id' => $ch2->id, 'topic_title' => 'JSX and Components'],
            ['video_url' => 'https://www.youtube.com/watch?v=SqcY0GlETPk', 'order_index' => 1]
        );

        // 2. Data Science with Python
        $course2 = Course::updateOrCreate(
            ['tenant_id' => $tenant->id, 'name' => 'Data Science with Python'],
            [
                'user_id' => $instructor->id,
                'slug' => 'data-science-with-python',
                'code' => 'DS-201',
                'description' => 'Learn data analysis, visualization, and machine learning basics.',
                'is_published' => true,
                'total_fees' => 20000.00,
                'duration_months' => 4,
            ]
        );

        $ch3 = Chapter::updateOrCreate(
            ['tenant_id' => $tenant->id, 'course_id' => $course2->id, 'chapter_title' => 'NumPy & Pandas'],
            ['order_index' => 1]
        );
        Topic::updateOrCreate(
            ['tenant_id' => $tenant->id, 'chapters_id' => $ch3->id, 'topic_title' => 'Data Manipulation with Pandas'],
            ['video_url' => 'https://www.youtube.com/watch?v=vmEHCJofslg', 'order_index' => 1]
        );
    }
}
