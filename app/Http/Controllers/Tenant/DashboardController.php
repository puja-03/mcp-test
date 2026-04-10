<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $tenant = app()->bound('currentTenant') ? app('currentTenant') : null;

        if (! $tenant) {
            abort(404, 'Tenant not found');
        }

        $user = $request->user();
        if (! $user) {
            return redirect()->route('home');
        }

        // Only allow tenant users or global admins
        $isAdmin = $user->hasRole('admin');
        if ($user->tenant_id !== $tenant->id && ! $isAdmin) {
            abort(403);
        }

        return Inertia::render('tenant/dashboard', [
            'tenant' => $tenant,
            'user' => $user,
            'stats' => [
                'students_count' => User::whereHas('role', fn ($q) => $q->where('name', 'student'))->count(),
                'courses_count' => Course::count(),
                'batches_count' => Batch::count(),
                'enrollments_count' => Enrollment::count(),
            ],
        ]);
    }
}
