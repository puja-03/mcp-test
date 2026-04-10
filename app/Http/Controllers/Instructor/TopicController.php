<?php

namespace App\Http\Controllers\Instructor;

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
            ->whereHas('chapter.course', fn ($q) => $q->where('user_id', $request->user()->id))
            ->when($request->input('chapter_id'), fn ($q, $c) => $q->where('chapters_id', $c))
            ->orderBy('order_index')
            ->paginate(15)
            ->withQueryString();

        $chapters = Chapter::with('course')->whereHas('course', fn ($q) => $q->where('user_id', $request->user()->id))->get();

        return Inertia::render('instructor/topics/Index', ['topics' => $topics, 'chapters' => $chapters, 'filters' => $request->only(['chapter_id'])]);
    }

    public function create(Request $request)
    {
        $chapters = Chapter::with('course')->whereHas('course', fn ($q) => $q->where('user_id', auth()->id()))->get();

        return Inertia::render('instructor/topics/Create', ['chapters' => $chapters, 'selected_chapter_id' => $request->input('chapter_id')]);
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

        $chapter = Chapter::with('course')->findOrFail($validated['chapters_id']);
        abort_if($chapter->course->user_id !== auth()->id(), 403);

        Topic::create($validated);

        return redirect()->route('instructor.topics.index', ['chapter_id' => $validated['chapters_id']])->with('success', 'Topic created.');
    }

    public function edit(Topic $topic)
    {
        abort_if($topic->chapter->course->user_id !== auth()->id(), 403);

        return Inertia::render('instructor/topics/Edit', [
            'topic' => $topic->load('chapter.course'),
            'chapters' => Chapter::with('course')->whereHas('course', fn ($q) => $q->where('user_id', auth()->id()))->get(),
        ]);
    }

    public function update(Request $request, Topic $topic)
    {
        abort_if($topic->chapter->course->user_id !== auth()->id(), 403);

        $validated = $request->validate([
            'chapters_id' => 'required|exists:chapters,id',
            'topic_title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'nullable|url|max:500',
            'order_index' => 'nullable|integer|min:0',
        ]);

        $topic->update($validated);

        return redirect()->route('instructor.topics.index', ['chapter_id' => $topic->chapters_id])->with('success', 'Topic updated.');
    }

    public function destroy(Topic $topic)
    {
        abort_if($topic->chapter->course->user_id !== auth()->id(), 403);
        $chapterId = $topic->chapters_id;
        $topic->delete();

        return redirect()->route('instructor.topics.index', ['chapter_id' => $chapterId])->with('success', 'Topic deleted.');
    }
}
