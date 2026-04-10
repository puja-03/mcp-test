<?php

namespace Database\Seeders;

use App\Models\Batch;
use App\Models\Chapter;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Role;
use App\Models\Tenant;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Database\Seeder;

class RandomDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenant = Tenant::where('domain', 'global')->first();
        $studentRole = Role::where('name', 'student')->first();
        $instructorRole = Role::where('name', 'instructor')->first();

        // 1. Create more Instructors (10)
        $instructors = User::factory(10)->create([
            'tenant_id' => $tenant->id,
            'role_id' => $instructorRole->id,
        ]);

        // 2. Create more Students (50)
        $students = User::factory(50)->create([
            'tenant_id' => $tenant->id,
            'role_id' => $studentRole->id,
        ]);

        // 3. Create more Courses (10)
        $courses = Course::factory(10)->create([
            'tenant_id' => $tenant->id,
            'user_id' => fn() => $instructors->random()->id,
        ]);

        // 4. For each course, add content and batches
        foreach ($courses as $course) {
            // Chapters (3 per course)
            $chapters = Chapter::factory(3)->create([
                'course_id' => $course->id,
            ]);

            // Topics (4 per chapter)
            foreach ($chapters as $chapter) {
                Topic::factory(4)->create([
                    'chapters_id' => $chapter->id,
                ]);
            }

            // Create an active Batch
            $batch = Batch::factory()->create([
                'tenant_id' => $tenant->id,
                'course_id' => $course->id,
            ]);

            // Enroll random students (10-20 students per batch)
            $selectedStudents = $students->random(rand(10, 20));
            foreach ($selectedStudents as $student) {
                Enrollment::updateOrCreate(
                    ['student_id' => $student->id, 'batch_id' => $batch->id],
                    [
                        'tenant_id' => $tenant->id,
                        'enrollment_date' => now()->subDays(rand(1, 30)),
                        'status' => 'active',
                        'amount' => $course->total_fees,
                        'currency' => 'INR',
                    ]
                );
            }
        }
    }
}
