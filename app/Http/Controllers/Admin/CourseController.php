<?php

namespace App\Http\Controllers\Admin;

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
        $status = $request->input('status');

        $courses = Course::with('instructor')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%");
            })
            ->when($status !== null, function ($query) use ($status) {
                if ($status === 'active') {
                    $query->where('is_active', true);
                } elseif ($status === 'inactive') {
                    $query->where('is_active', false);
                }
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/courses/Index', [
            'courses' => $courses,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        $instructors = User::whereHas('role', function ($q) {
            $q->where('name', 'instructor');
        })->select('id', 'name', 'email')->get();

        return Inertia::render('admin/courses/Create', [
            'instructors' => $instructors,
        ]);
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

        $validated['is_active'] = $request->input('is_active', true);
        $validated['is_published'] = $request->input('is_published', false);

        Course::create($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully.');
    }

    public function show(Course $course)
    {
        $course->load(['instructor', 'chapters.topics', 'batches']);

        return Inertia::render('admin/courses/Show', [
            'course' => $course,
        ]);
    }

    public function edit(Course $course)
    {
        $instructors = User::whereHas('role', function ($q) {
            $q->where('name', 'instructor');
        })->select('id', 'name', 'email')->get();

        return Inertia::render('admin/courses/Edit', [
            'course' => $course,
            'instructors' => $instructors,
        ]);
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

        $validated['is_active'] = $request->input('is_active', true);
        $validated['is_published'] = $request->input('is_published', false);

        $course->update($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('admin.courses.index')->with('success', 'Course deleted successfully.');
    }
}
