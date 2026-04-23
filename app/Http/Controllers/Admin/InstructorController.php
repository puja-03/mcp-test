<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Models\Tenant;
use App\Models\InstructorProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class InstructorController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $tenantId = $request->input('tenant_id');

        $instructors = User::whereHas('role', fn ($q) => $q->where('name', 'instructor'))
            ->with(['instructorProfile', 'tenant'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($tenantId, function ($query, $tenantId) {
                $query->where('tenant_id', $tenantId);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $tenants = Tenant::all(['id', 'name']);

        return Inertia::render('admin/instructors/Index', [
            'instructors' => $instructors,
            'tenants' => $tenants,
            'filters' => $request->only(['search', 'tenant_id']),
        ]);
    }

    public function create()
    {
        $tenants = Tenant::all(['id', 'name']);
        return Inertia::render('admin/instructors/Create', [
            'tenants' => $tenants,
        ]);
    }

    public function store(Request $request)
    {
        $instructorRole = Role::where('name', 'instructor')->first();

        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'specialization' => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0',
            'education' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'skills' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated, $instructorRole) {
            $user = User::create([
                'tenant_id' => $validated['tenant_id'],
                'role_id' => $instructorRole->id,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            InstructorProfile::create([
                'tenant_id' => $validated['tenant_id'],
                'user_id' => $user->id,
                'specialization' => $validated['specialization'] ?? null,
                'experience_years' => $validated['experience_years'] ?? null,
                'education' => $validated['education'] ?? null,
                'bio' => $validated['bio'] ?? null,
                'skills' => isset($validated['skills']) ? array_map('trim', explode(',', $validated['skills'])) : null,
            ]);
        });

        return redirect()->route('admin.instructors.index')
            ->with('success', 'Instructor created successfully.');
    }

    public function edit(User $instructor)
    {
        $instructor->load(['instructorProfile', 'tenant']);
        $tenants = Tenant::all(['id', 'name']);

        return Inertia::render('admin/instructors/Edit', [
            'instructor' => $instructor,
            'tenants' => $tenants,
        ]);
    }

    public function update(Request $request, User $instructor)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $instructor->id,
            'password' => 'nullable|string|min:8',
            'specialization' => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0',
            'education' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'skills' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated, $instructor) {
            $userUpdate = [
                'tenant_id' => $validated['tenant_id'],
                'name' => $validated['name'],
                'email' => $validated['email'],
            ];

            if (!empty($validated['password'])) {
                $userUpdate['password'] = Hash::make($validated['password']);
            }

            $instructor->update($userUpdate);

            $instructor->instructorProfile()->updateOrCreate(
                ['user_id' => $instructor->id],
                [
                    'tenant_id' => $validated['tenant_id'],
                    'specialization' => $validated['specialization'] ?? null,
                    'experience_years' => $validated['experience_years'] ?? null,
                    'education' => $validated['education'] ?? null,
                    'bio' => $validated['bio'] ?? null,
                    'skills' => isset($validated['skills']) ? array_map('trim', explode(',', $validated['skills'])) : null,
                ]
            );
        });

        return redirect()->route('admin.instructors.index')
            ->with('success', 'Instructor updated successfully.');
    }

    public function destroy(User $instructor)
    {
        $instructor->delete();
        return redirect()->route('admin.instructors.index')
            ->with('success', 'Instructor deleted successfully.');
    }
}
