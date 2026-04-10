<?php

namespace Database\Seeders;

use App\Models\Batch;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;

class AcademicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenant = Tenant::where('domain', 'global')->first();
        $student = User::where('email', 'student@example.com')->first();
        $courses = Course::where('tenant_id', $tenant->id)->get();

        foreach ($courses as $course) {
            // Create a batch using updateOrCreate to prevent unique constraint violations
            $batch = Batch::updateOrCreate(
                ['tenant_id' => $tenant->id, 'name' => 'Batch ' . $course->code . ' - A'],
                [
                    'course_id' => $course->id,
                    'start_date' => now()->startOfMonth(),
                    'end_date' => now()->addMonths(6),
                    'status' => 'active',
                ]
            );

            // Enroll the student using updateOrCreate
            Enrollment::updateOrCreate(
                ['tenant_id' => $tenant->id, 'student_id' => $student->id, 'batch_id' => $batch->id],
                [
                    'enrollment_date' => now(),
                    'status' => 'active',
                    'amount' => $course->total_fees,
                    'currency' => 'INR',
                ]
            );
        }
    }
}
