<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\Batch;
use App\Models\Chapter;
use App\Models\ClassSession;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Exam;
use App\Models\FeeStructure;
use App\Models\InstructorProfile;
use App\Models\Result;
use App\Models\Role;
use App\Models\Tenant;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MassiveDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $tenantAdminRole = Role::where('name', 'tenant-admin')->first();
        $instructorRole = Role::where('name', 'instructor')->first();
        $studentRole = Role::where('name', 'student')->first();

        // 1. Create 25 Tenants
        $tenants = Tenant::factory(25)->create();

        // 2. Create 200 Instructors (8 per tenant approx)
        $instructors = collect();
        foreach ($tenants as $tenant) {
            // Create 1 Tenant Admin for each
            User::factory()->create([
                'tenant_id' => $tenant->id,
                'role_id' => $tenantAdminRole->id,
                'email' => 'admin@' . $tenant->domain . '.com',
            ]);

            // Create 8 Instructors per tenant
            $tenantInstructors = User::factory(8)->create([
                'tenant_id' => $tenant->id,
                'role_id' => $instructorRole->id,
            ]);

            foreach ($tenantInstructors as $instructor) {
                InstructorProfile::factory()->create([
                    'user_id' => $instructor->id,
                    'tenant_id' => $tenant->id,
                ]);
            }
            $instructors = $instructors->concat($tenantInstructors);
        }

        // 3. Create 500 Students
        $students = collect();
        foreach ($tenants as $tenant) {
            $tenantStudents = collect();
            for ($i = 1; $i <= 20; $i++) {
                $student = User::factory()->create([
                    'tenant_id' => $tenant->id,
                    'role_id' => $studentRole->id,
                    'email' => "student{$i}_{$tenant->id}@" . $tenant->domain . ".com",
                ]);
                $tenantStudents->push($student);
            }
            $students = $students->concat($tenantStudents);
        }

        // 4. Create Academic & Financial Data
        foreach ($tenants as $tenant) {
            $tenantInstructors = $instructors->where('tenant_id', $tenant->id);
            $tenantStudents = $students->where('tenant_id', $tenant->id);

            // 5 Courses per tenant
            $courses = Course::factory(5)->create([
                'tenant_id' => $tenant->id,
                'user_id' => fn() => $tenantInstructors->random()->id,
            ]);

            foreach ($courses as $course) {
                // Fee Structure (1 per course)
                FeeStructure::factory()->create([
                    'tenant_id' => $tenant->id,
                    'course_id' => $course->id,
                    'total_amount' => $course->total_fees,
                ]);

                // Chapters and Topics
                $chapters = Chapter::factory(2)->create(['course_id' => $course->id]);
                foreach ($chapters as $chapter) {
                    Topic::factory(3)->create(['chapters_id' => $chapter->id]);
                }

                // Batches (2 per course)
                $batches = Batch::factory(2)->create([
                    'tenant_id' => $tenant->id,
                    'course_id' => $course->id,
                ]);

                foreach ($batches as $batch) {
                    // Enroll 10 students per batch
                    $enrolledStudents = $tenantStudents->random(min(10, $tenantStudents->count()));
                    foreach ($enrolledStudents as $student) {
                        Enrollment::factory()->create([
                            'tenant_id' => $tenant->id,
                            'student_id' => $student->id,
                            'batch_id' => $batch->id,
                            'amount' => $course->total_fees,
                        ]);
                    }

                    // Class Sessions (5 per batch)
                    for ($i = 0; $i < 5; $i++) {
                        $session = ClassSession::factory()->create([
                            'tenant_id' => $tenant->id,
                            'batch_id' => $batch->id,
                            'session_date' => now()->addDays($i)->format('Y-m-d'),
                        ]);

                        // Attendance for each enrolled student
                        foreach ($enrolledStudents as $student) {
                            Attendance::factory()->create([
                                'tenant_id' => $tenant->id,
                                'class_session_id' => $session->id,
                                'student_id' => $student->id,
                                'marked_by' => $tenantInstructors->random()->id,
                                'marked_at' => now(),
                            ]);
                        }
                    }

                    // Exams (1 per batch)
                    $exams = Exam::factory(1)->create([
                        'tenant_id' => $tenant->id,
                        'batch_id' => $batch->id,
                    ]);

                    foreach ($exams as $exam) {
                        // Results for each enrolled student
                        foreach ($enrolledStudents as $student) {
                            Result::factory()->create([
                                'tenant_id' => $tenant->id,
                                'exam_id' => $exam->id,
                                'student_id' => $student->id,
                            ]);
                        }
                    }
                }
            }
        }
    }
}
