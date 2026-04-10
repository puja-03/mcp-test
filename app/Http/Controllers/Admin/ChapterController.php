<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChapterController extends Controller
{
    public function index(Request $request)
    {
        $courseId = $request->input('course_id');

        $chapters = Chapter::with('course')
            ->when($courseId, function ($query, $courseId) {
                $query->where('course_id', $courseId);
            })
            ->orderBy('order_index')
            ->paginate(15)
            ->withQueryString();

        $courses = Course::select('id', 'name')->get();

        return Inertia::render('admin/chapters/Index', [
            'chapters' => $chapters,
            'courses' => $courses,
            'filters' => $request->only(['course_id']),
        ]);
    }

    public function create()
    {
        $courses = Course::select('id', 'name')->get();

        return Inertia::render('admin/chapters/Create', [
            'courses' => $courses,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'chapter_title' => 'required|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        $validated['user_id'] = auth()->id();

        Chapter::create($validated);

        return redirect()->route('admin.chapters.index', ['course_id' => $validated['course_id']])
            ->with('success', 'Chapter created successfully.');
    }

    public function edit(Chapter $chapter)
    {
        $chapter->load('course');
        $courses = Course::select('id', 'name')->get();

        return Inertia::render('admin/chapters/Edit', [
            'chapter' => $chapter,
            'courses' => $courses,
        ]);
    }

    public function update(Request $request, Chapter $chapter)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'chapter_title' => 'required|string|max:255',
            'order_index' => 'nullable|integer|min:0',
        ]);

        $chapter->update($validated);

        return redirect()->route('admin.chapters.index', ['course_id' => $chapter->course_id])
            ->with('success', 'Chapter updated successfully.');
    }

    public function destroy(Chapter $chapter)
    {
        $courseId = $chapter->course_id;
        $chapter->delete();

        return redirect()->route('admin.chapters.index', ['course_id' => $courseId])
            ->with('success', 'Chapter deleted successfully.');
    }
}
