<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Models\InstructorProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class InstructorController extends Controller
{
    public function index(Request $request)
    {
        $tenant = app('currentTenant');
        $search = $request->input('search');

        $instructors = User::where('tenant_id', $tenant->id)
            ->whereHas('role', fn ($q) => $q->where('name', 'instructor'))
            ->with('instructorProfile')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('tenant/instructors/Index', [
            'instructors' => $instructors,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('tenant/instructors/Create');
    }

    public function store(Request $request)
    {
        $tenant = app('currentTenant');
        $instructorRole = Role::where('name', 'instructor')->first();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'specialization' => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0',
            'education' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'skills' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated, $tenant, $instructorRole) {
            $user = User::create([
                'tenant_id' => $tenant->id,
                'role_id' => $instructorRole->id,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            InstructorProfile::create([
                'tenant_id' => $tenant->id,
                'user_id' => $user->id,
                'specialization' => $validated['specialization'] ?? null,
                'experience_years' => $validated['experience_years'] ?? null,
                'education' => $validated['education'] ?? null,
                'bio' => $validated['bio'] ?? null,
                'skills' => isset($validated['skills']) ? array_map('trim', explode(',', $validated['skills'])) : null,
            ]);
        });

        return redirect()->route('tenant.instructors.index')
            ->with('success', 'Instructor created successfully.');
    }

    public function edit(User $instructor)
    {
        $tenant = app('currentTenant');
        if ($instructor->tenant_id !== $tenant->id) {
            abort(403);
        }

        $instructor->load('instructorProfile');

        return Inertia::render('tenant/instructors/Edit', [
            'instructor' => $instructor,
        ]);
    }

    public function update(Request $request, User $instructor)
    {
        $tenant = app('currentTenant');
        if ($instructor->tenant_id !== $tenant->id) {
            abort(403);
        }

        $validated = $request->validate([
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
                    'tenant_id' => $instructor->tenant_id,
                    'specialization' => $validated['specialization'] ?? null,
                    'experience_years' => $validated['experience_years'] ?? null,
                    'education' => $validated['education'] ?? null,
                    'bio' => $validated['bio'] ?? null,
                    'skills' => isset($validated['skills']) ? array_map('trim', explode(',', $validated['skills'])) : null,
                ]
            );
        });

        return redirect()->route('tenant.instructors.index')
            ->with('success', 'Instructor updated successfully.');
    }

    public function destroy(User $instructor)
    {
        $tenant = app('currentTenant');
        if ($instructor->tenant_id !== $tenant->id) {
            abort(403);
        }

        $instructor->delete(); // This will also delete profile if cascaded, or manually handle if needed.

        return redirect()->route('tenant.instructors.index')
            ->with('success', 'Instructor deleted successfully.');
    }
}
