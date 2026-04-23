<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\ClassSession;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Exam;
use App\Models\Result;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $userId = $user->id;

        // Courses taught by this instructor
        $coursesCount = Course::where('user_id', $userId)->count();

        // Active students across all instructor's batches
        $studentsCount = Enrollment::whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))
            ->where('status', 'active')
            ->distinct('student_id')
            ->count();

        // Total class sessions held by this instructor
        $sessionsCount = ClassSession::whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))->count();

        // Exams created by this instructor
        $examsCount = Exam::whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))->count();

        // Results entered by this instructor
        $resultsCount = Result::whereHas('exam.batch.course', fn ($q) => $q->where('user_id', $userId))->count();

        // Attendance summary for this instructor
        $totalAttendance = Attendance::whereHas('classSession.batch.course', fn ($q) => $q->where('user_id', $userId))->count();
        $presentAttendance = Attendance::whereHas('classSession.batch.course', fn ($q) => $q->where('user_id', $userId))
            ->where('status', 'present')->count();
        $attendanceRate = $totalAttendance > 0
            ? round(($presentAttendance / $totalAttendance) * 100)
            : 0;

        // Recent courses with enrollment count
        $recentCourses = Course::where('user_id', $userId)
            ->withCount(['enrollments' => fn ($q) => $q->where('status', 'active')])
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'code' => $c->code,
                'is_published' => $c->is_published,
                'active_students' => $c->enrollments_count,
            ]);

        // Recent exams
        $recentExams = Exam::with('batch')
            ->whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))
            ->latest('exam_date')
            ->limit(5)
            ->get()
            ->map(fn ($e) => [
                'id' => $e->id,
                'title' => $e->title,
                'batch_name' => $e->batch?->name,
                'exam_date' => $e->exam_date?->toDateString(),
                'max_marks' => $e->max_marks,
            ]);

        return Inertia::render('instructor/dashboard/Index', [
            'stats' => [
                'courses' => $coursesCount,
                'students' => $studentsCount,
                'sessions' => $sessionsCount,
                'exams' => $examsCount,
                'results' => $resultsCount,
                'attendance_rate' => $attendanceRate,
            ],
            'recentCourses' => $recentCourses,
            'recentExams' => $recentExams,
        ]);
    }
}
