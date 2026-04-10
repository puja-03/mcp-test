<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{
    public function index(Request $request)
    {
        $topics = Topic::with('chapter.course')
            ->when($request->input('chapter_id'), fn ($q, $c) => $q->where('chapters_id', $c))
            ->orderBy('order_index')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('tenant/topics/Index', [
            'topics' => $topics,
            'chapters' => Chapter::with('course')->get(),
            'filters' => $request->only(['chapter_id']),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('tenant/topics/Create', [
            'chapters' => Chapter::with('course')->get(),
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

        return redirect()->route('tenant.topics.index', ['chapter_id' => $validated['chapters_id']])->with('success', 'Topic created.');
    }

    public function edit(Topic $topic)
    {
        return Inertia::render('tenant/topics/Edit', [
            'topic' => $topic->load('chapter.course'),
            'chapters' => Chapter::with('course')->get(),
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

        return redirect()->route('tenant.topics.index', ['chapter_id' => $topic->chapters_id])->with('success', 'Topic updated.');
    }

    public function destroy(Topic $topic)
    {
        $chapterId = $topic->chapters_id;
        $topic->delete();

        return redirect()->route('tenant.topics.index', ['chapter_id' => $chapterId])->with('success', 'Topic deleted.');
    }
}
