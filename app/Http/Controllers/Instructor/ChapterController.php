<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChapterController extends Controller
{
    public function index(Request $request)
    {
        $chapters = Chapter::with('course')
            ->whereHas('course', fn ($q) => $q->where('user_id', $request->user()->id))
            ->when($request->input('course_id'), fn ($q, $c) => $q->where('course_id', $c))
            ->orderBy('order_index')
            ->paginate(15)
            ->withQueryString();

        $courses = Course::where('user_id', $request->user()->id)->select('id', 'name')->get();

        return Inertia::render('instructor/chapters/Index', ['chapters' => $chapters, 'courses' => $courses, 'filters' => $request->only(['course_id'])]);
    }

    public function create()
    {
        return Inertia::render('instructor/chapters/Create', ['courses' => Course::where('user_id', auth()->id())->select('id', 'name')->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'chapter_title' => 'required|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        $course = Course::findOrFail($validated['course_id']);
        abort_if($course->user_id !== auth()->id(), 403);

        $validated['user_id'] = auth()->id();
        Chapter::create($validated);

        return redirect()->route('instructor.chapters.index', ['course_id' => $validated['course_id']])->with('success', 'Chapter created.');
    }

    public function edit(Chapter $chapter)
    {
        abort_if($chapter->course->user_id !== auth()->id(), 403);

        return Inertia::render('instructor/chapters/Edit', [
            'chapter' => $chapter->load('course'),
            'courses' => Course::where('user_id', auth()->id())->select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Chapter $chapter)
    {
        abort_if($chapter->course->user_id !== auth()->id(), 403);

        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'chapter_title' => 'required|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        $chapter->update($validated);

        return redirect()->route('instructor.chapters.index', ['course_id' => $chapter->course_id])->with('success', 'Chapter updated.');
    }

    public function destroy(Chapter $chapter)
    {
        abort_if($chapter->course->user_id !== auth()->id(), 403);
        $courseId = $chapter->course_id;
        $chapter->delete();

        return redirect()->route('instructor.chapters.index', ['course_id' => $courseId])->with('success', 'Chapter deleted.');
    }
}
