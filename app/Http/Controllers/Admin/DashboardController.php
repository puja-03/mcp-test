<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('admin/dashboard', [
            'stats' => [
                'total_tenants' => \App\Models\Tenant::count(),
                'total_users' => \App\Models\User::count(),
                'total_courses' => \App\Models\Course::count(),
                'total_payments' => (float) \App\Models\Payment::sum('amount'),
                'recent_tenants' => \App\Models\Tenant::latest()->take(5)->get(),
                'recent_payments' => \App\Models\Payment::with(['user', 'enrollment.course'])->latest()->take(5)->get(),
            ]
        ]);
    }
}
