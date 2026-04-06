<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
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
        ]);
    }
}
