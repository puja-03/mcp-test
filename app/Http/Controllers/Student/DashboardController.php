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

        return Inertia::render('student/dashboard/Index', [
            'stats' => ['enrolled_courses' => $enrolledCount],
        ]);
    }
}
