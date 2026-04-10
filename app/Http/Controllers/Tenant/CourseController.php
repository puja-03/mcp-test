<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $courses = Course::with('instructor')
            ->when($search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%")->orWhere('code', 'like', "%{$s}%"))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('tenant/courses/Index', [
            'courses' => $courses,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $instructors = User::whereHas('role', fn ($q) => $q->where('name', 'instructor'))->select('id', 'name', 'email')->get();

        return Inertia::render('tenant/courses/Create', ['instructors' => $instructors]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'duration_months' => 'nullable|integer|min:1',
            'total_fees' => 'required|numeric|min:0',
            'is_active' => 'boolean',
            'is_published' => 'boolean',
            'user_id' => 'nullable|exists:users,id',
        ]);

        Course::create($validated);

        return redirect()->route('tenant.courses.index')->with('success', 'Course created.');
    }

    public function edit(Course $course)
    {
        $instructors = User::whereHas('role', fn ($q) => $q->where('name', 'instructor'))->select('id', 'name', 'email')->get();

        return Inertia::render('tenant/courses/Edit', ['course' => $course, 'instructors' => $instructors]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'duration_months' => 'nullable|integer|min:1',
            'total_fees' => 'required|numeric|min:0',
            'is_active' => 'boolean',
            'is_published' => 'boolean',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $course->update($validated);

        return redirect()->route('tenant.courses.index')->with('success', 'Course updated.');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('tenant.courses.index')->with('success', 'Course deleted.');
    }
}
