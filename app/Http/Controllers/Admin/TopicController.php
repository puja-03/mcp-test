<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{
    public function index(Request $request)
    {
        $chapterId = $request->input('chapter_id');

        $topics = Topic::with('chapter.course')
            ->when($chapterId, function ($query, $chapterId) {
                $query->where('chapters_id', $chapterId);
            })
            ->orderBy('order_index')
            ->paginate(15)
            ->withQueryString();

        $chapters = Chapter::with('course')->get();

        return Inertia::render('admin/topics/Index', [
            'topics' => $topics,
            'chapters' => $chapters,
            'filters' => $request->only(['chapter_id']),
        ]);
    }

    public function create(Request $request)
    {
        $chapters = Chapter::with('course')->get();

        return Inertia::render('admin/topics/Create', [
            'chapters' => $chapters,
            'selected_chapter_id' => $request->input('chapter_id'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'chapters_id' => 'required|exists:chapters,id',
            'topic_title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'nullable|url|max:500',
            'order_index' => 'nullable|integer|min:0',
        ]);

        Topic::create($validated);

        return redirect()->route('admin.topics.index', ['chapter_id' => $validated['chapters_id']])
            ->with('success', 'Topic created successfully.');
    }

    public function edit(Topic $topic)
    {
        $topic->load('chapter.course');
        $chapters = Chapter::with('course')->get();

        return Inertia::render('admin/topics/Edit', [
            'topic' => $topic,
            'chapters' => $chapters,
        ]);
    }

    public function update(Request $request, Topic $topic)
    {
        $validated = $request->validate([
            'chapters_id' => 'required|exists:chapters,id',
            'topic_title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'nullable|url|max:500',
            'order_index' => 'nullable|integer|min:0',
        ]);

        $topic->update($validated);

        return redirect()->route('admin.topics.index', ['chapter_id' => $topic->chapters_id])
            ->with('success', 'Topic updated successfully.');
    }

    public function destroy(Topic $topic)
    {
        $chapterId = $topic->chapters_id;
        $topic->delete();

        return redirect()->route('admin.topics.index', ['chapter_id' => $chapterId])
            ->with('success', 'Topic deleted successfully.');
    }
}
