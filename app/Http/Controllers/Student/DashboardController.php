<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $enrolledCount = Enrollment::where('student_id', $user->id)->where('status', 'active')->count();

        // Fetch courses the student is enrolled in, with nested chapters and topics
        $enrollments = Enrollment::with(['batch.course.chapters.topics'])
            ->where('student_id', $user->id)
            ->where('status', 'active')
            ->get();

        $enrolledCourses = $enrollments->map(function ($enrollment) {
            return $enrollment->batch->course;
        })->unique('id')->values();

        return Inertia::render('student/dashboard/Index', [
            'stats' => ['enrolled_courses' => $enrolledCount],
            'courses' => $enrolledCourses,
        ]);
    }
}
