<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $courses = Course::where('user_id', $request->user()->id)
            ->when($request->input('search'), fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->withCount('chapters')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('instructor/courses/Index', ['courses' => $courses, 'filters' => $request->only(['search'])]);
    }

    public function show(Course $course)
    {
        abort_if($course->user_id !== auth()->id(), 403);
        $course->load(['chapters.topics', 'batches']);

        return Inertia::render('instructor/courses/Show', ['course' => $course]);
    }

    public function edit(Course $course)
    {
        abort_if($course->user_id !== auth()->id(), 403);

        return Inertia::render('instructor/courses/Edit', ['course' => $course]);
    }

    public function update(Request $request, Course $course)
    {
        abort_if($course->user_id !== auth()->id(), 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'duration_months' => 'nullable|integer|min:1',
            'total_fees' => 'required|numeric|min:0',
            'is_published' => 'boolean',
        ]);

        $course->update($validated);

        return redirect()->route('instructor.courses.index')->with('success', 'Course updated.');
    }
}
