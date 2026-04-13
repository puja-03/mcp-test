<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $exams = Exam::with('batch')
            ->whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))
            ->when($request->input('search'), fn ($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->when($request->input('batch_id'), fn ($q, $b) => $q->where('batch_id', $b))
            ->latest('exam_date')
            ->paginate(15)
            ->withQueryString();

        $batches = Batch::whereHas('course', fn ($q) => $q->where('user_id', $userId))->select('id', 'name')->get();

        return Inertia::render('instructor/exams/Index', [
            'exams' => $exams,
            'batches' => $batches,
            'filters' => $request->only(['search', 'batch_id']),
        ]);
    }

    public function create(Request $request)
    {
        $userId = $request->user()->id;
        $batches = Batch::whereHas('course', fn ($q) => $q->where('user_id', $userId))->select('id', 'name')->get();

        return Inertia::render('instructor/exams/Create', ['batches' => $batches]);
    }

    public function store(Request $request)
    {
        $userId = $request->user()->id;

        $validated = $request->validate([
            'batch_id' => 'required|exists:batches,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'exam_date' => 'required|date',
            'max_marks' => 'required|numeric|min:1',
            'passing_marks' => 'nullable|numeric|min:0|lte:max_marks',
        ]);

        // Authorization check
        $isAuthorized = Batch::whereHas('course', fn ($q) => $q->where('user_id', $userId))
            ->where('id', $validated['batch_id'])
            ->exists();
        abort_if(! $isAuthorized, 403, 'Unauthorized action.');

        Exam::create($validated);

        return redirect()->route('instructor.exams.index')->with('success', 'Exam created.');
    }

    public function edit(Request $request, Exam $exam)
    {
        $userId = $request->user()->id;

        // Authorization check
        $exam->load('batch');
        abort_if(! $exam->batch || $exam->batch->course->user_id !== $userId, 403, 'Unauthorized action.');

        $batches = Batch::whereHas('course', fn ($q) => $q->where('user_id', $userId))->select('id', 'name')->get();

        return Inertia::render('instructor/exams/Edit', ['exam' => $exam, 'batches' => $batches]);
    }

    public function update(Request $request, Exam $exam)
    {
        $userId = $request->user()->id;

        $exam->load('batch.course');
        abort_if($exam->batch->course->user_id !== $userId, 403, 'Unauthorized action.');

        $validated = $request->validate([
            'batch_id' => 'required|exists:batches,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'exam_date' => 'required|date',
            'max_marks' => 'required|numeric|min:1',
            'passing_marks' => 'nullable|numeric|min:0|lte:max_marks',
        ]);

        // Ensure new batch is also owned
        $isAuthorized = Batch::whereHas('course', fn ($q) => $q->where('user_id', $userId))
            ->where('id', $validated['batch_id'])
            ->exists();
        abort_if(! $isAuthorized, 403, 'Unauthorized action.');

        $exam->update($validated);

        return redirect()->route('instructor.exams.index')->with('success', 'Exam updated.');
    }

    public function destroy(Request $request, Exam $exam)
    {
        $userId = $request->user()->id;

        $exam->load('batch.course');
        abort_if($exam->batch->course->user_id !== $userId, 403, 'Unauthorized action.');

        $exam->delete();

        return redirect()->route('instructor.exams.index')->with('success', 'Exam deleted.');
    }
}
