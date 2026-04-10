<?php

namespace App\Http\Controllers\Tenant;

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
            ->when($request->input('course_id'), fn ($q, $c) => $q->where('course_id', $c))
            ->orderBy('order_index')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('tenant/chapters/Index', [
            'chapters' => $chapters,
            'courses' => Course::select('id', 'name')->get(),
            'filters' => $request->only(['course_id']),
        ]);
    }

    public function create()
    {
        return Inertia::render('tenant/chapters/Create', ['courses' => Course::select('id', 'name')->get()]);
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

        return redirect()->route('tenant.chapters.index', ['course_id' => $validated['course_id']])->with('success', 'Chapter created.');
    }

    public function edit(Chapter $chapter)
    {
        return Inertia::render('tenant/chapters/Edit', [
            'chapter' => $chapter->load('course'),
            'courses' => Course::select('id', 'name')->get(),
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

        return redirect()->route('tenant.chapters.index', ['course_id' => $chapter->course_id])->with('success', 'Chapter updated.');
    }

    public function destroy(Chapter $chapter)
    {
        $courseId = $chapter->course_id;
        $chapter->delete();

        return redirect()->route('tenant.chapters.index', ['course_id' => $courseId])->with('success', 'Chapter deleted.');
    }
}
