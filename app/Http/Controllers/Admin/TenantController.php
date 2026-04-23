<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::withCount('users')->get()->map(function ($tenant) {
            $admin = $tenant->users()->withoutGlobalScopes()->with('role')->whereHas('role', function ($q) {
                $q->where('name', 'tenant-admin');
            })->first();

            return [
                'id' => $tenant->id,
                'name' => $tenant->name,
                'domain' => $tenant->domain,
                'users_count' => $tenant->users_count,
                'admin_email' => $admin?->email,
                'admin_joined_at' => $admin?->created_at?->toDateString(),
            ];
        });

        return Inertia::render('admin/tenants', [
            'tenants' => $tenants,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/tenants/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'domain' => 'required|string|max:255|unique:tenants,domain',
            'admin_name' => 'nullable|string|max:255',
            'admin_email' => 'nullable|email',
            'admin_password' => 'nullable|string|min:6',
        ]);

        $tenant = Tenant::create([
            'name' => $validated['name'],
            'domain' => $validated['domain'],
        ]);

        if (! empty($validated['admin_email'])) {
            $user = User::firstOrCreate([
                'email' => $validated['admin_email'],
            ], [
                'name' => $validated['admin_name'] ?? $validated['admin_email'],
                'password' => isset($validated['admin_password']) ? Hash::make($validated['admin_password']) : Hash::make('password'),
                'tenant_id' => $tenant->id,
            ]);

            // assign tenant-admin role (not global admin)
            $tenantRole = Role::where('name', 'tenant-admin')->first();
            if ($tenantRole) {
                $user->update(['role_id' => $tenantRole->id]);
            }
        }

        return redirect()->route('admin.tenants.index')->with('success', 'Tenant created.');
    }

    public function destroy(Tenant $tenant)
    {
        $tenant->delete();
        return redirect()->back()->with('success', 'Tenant deleted.');
    }
}
