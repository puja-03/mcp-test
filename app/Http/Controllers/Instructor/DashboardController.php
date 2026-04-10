<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\ClassSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $coursesCount = Course::where('user_id', $user->id)->count();
        $studentsCount = Enrollment::whereHas('batch.course', fn ($q) => $q->where('user_id', $user->id))->where('status', 'active')->count();

        return Inertia::render('instructor/dashboard/Index', [
            'stats' => [
                'courses' => $coursesCount,
                'students' => $studentsCount,
            ],
        ]);
    }
}
