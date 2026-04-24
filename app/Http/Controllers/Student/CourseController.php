<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $courses = Course::whereHas('batches.enrollments', fn ($q) => $q->where('student_id', $user->id)->where('status', 'active'))
            ->with(['instructor', 'chapters.topics'])
            ->when($request->input('search'), fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->withCount('chapters')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('student/courses/Index', ['courses' => $courses, 'filters' => $request->only(['search'])]);
    }

    public function show(Course $course)
    {
        $user = request()->user();

        $isEnrolled = Enrollment::whereHas('batch', fn ($q) => $q->where('course_id', $course->id))
            ->where('student_id', $user->id)
            ->where('status', 'active')
            ->exists();

        abort_if(! $isEnrolled, 403, 'You are not enrolled in this course.');

        $course->load(['instructor', 'chapters.topics']);

        return Inertia::render('student/courses/Show', ['course' => $course]);
    }
}
