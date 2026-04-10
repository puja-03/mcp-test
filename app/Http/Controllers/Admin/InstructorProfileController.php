<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InstructorProfile;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstructorProfileController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $instructorRole = Role::where('name', 'instructor')->first();

        $profiles = InstructorProfile::with('user')
            ->when($search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/instructors/Index', [
            'profiles' => $profiles,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $instructorRole = Role::where('name', 'instructor')->first();

        $users = User::when($instructorRole, function ($query) use ($instructorRole) {
            $query->where('role_id', $instructorRole->id);
        })
            ->doesntHave('instructorProfile')
            ->select('id', 'name', 'email')
            ->get();

        return Inertia::render('admin/instructors/Create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:instructor_profiles,user_id',
            'specialization' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'twitter' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0',
            'education' => 'nullable|string|max:255',
            'skills' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);

        if (isset($validated['skills'])) {
            $validated['skills'] = array_map('trim', explode(',', $validated['skills']));
        }

        InstructorProfile::create($validated);

        return redirect()->route('admin.instructors.index')
            ->with('success', 'Instructor profile created successfully.');
    }

    public function edit(InstructorProfile $instructor)
    {
        $instructor->load('user');

        return Inertia::render('admin/instructors/Edit', [
            'profile' => $instructor,
        ]);
    }

    public function update(Request $request, InstructorProfile $instructor)
    {
        $validated = $request->validate([
            'specialization' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'twitter' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0',
            'education' => 'nullable|string|max:255',
            'skills' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);

        if (isset($validated['skills'])) {
            $validated['skills'] = array_map('trim', explode(',', $validated['skills']));
        }

        $instructor->update($validated);

        return redirect()->route('admin.instructors.index')
            ->with('success', 'Instructor profile updated successfully.');
    }

    public function destroy(InstructorProfile $instructor)
    {
        $instructor->delete();

        return redirect()->route('admin.instructors.index')
            ->with('success', 'Instructor profile deleted successfully.');
    }
}
