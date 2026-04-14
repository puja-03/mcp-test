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

        // Target tenant stats
        $tenantId = $user->tenant_id;
        $tenantStudentsCount = \App\Models\User::where('tenant_id', $tenantId)->whereHas('role', fn($q) => $q->where('name', 'student'))->count();
        $tenantClassSessionsCount = \App\Models\ClassSession::where('tenant_id', $tenantId)->count();
        $tenantEnrollmentsCount = Enrollment::where('tenant_id', $tenantId)->count();
        $tenantFeeStructuresCount = \App\Models\FeeStructure::where('tenant_id', $tenantId)->count();

        return Inertia::render('instructor/dashboard/Index', [
            'stats' => [
                'courses' => $coursesCount,
                'students' => $studentsCount,
            ],
            'tenantStats' => [
                'students' => $tenantStudentsCount,
                'classSessions' => $tenantClassSessionsCount,
                'enrollments' => $tenantEnrollmentsCount,
                'feeStructures' => $tenantFeeStructuresCount,
            ]
        ]);
    }
}
