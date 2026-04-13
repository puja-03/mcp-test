<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\Result;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $results = Result::with(['student', 'exam.batch'])
            ->whereHas('exam.batch.course', fn ($q) => $q->where('user_id', $userId))
            ->when($request->input('exam_id'), fn ($q, $c) => $q->where('exam_id', $c))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $exams = Exam::with('batch')
            ->whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))
            ->latest('exam_date')
            ->get();

        return Inertia::render('instructor/results/Index', [
            'results' => $results,
            'exams' => $exams,
            'filters' => $request->only(['exam_id']),
        ]);
    }

    public function create(Request $request)
    {
        $userId = $request->user()->id;

        $exams = Exam::with('batch')
            ->whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))
            ->latest('exam_date')
            ->get();

        $students = [];
        if ($request->input('exam_id')) {
            $exam = Exam::with('batch')->whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))->find($request->input('exam_id'));

            if ($exam && $exam->batch) {
                // Load active enrolled students for this batch
                $students = User::whereHas('enrollments', fn ($q) => $q->where('batch_id', $exam->batch_id)->where('status', 'active'))->get();
            }
        }

        return Inertia::render('instructor/results/Create', [
            'exams' => $exams,
            'students' => $students,
            'selected_exam_id' => $request->input('exam_id'),
        ]);
    }

    public function store(Request $request)
    {
        $userId = $request->user()->id;

        $validated = $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'student_id' => 'required|exists:users,id',
            'marks_obtained' => 'required|numeric|min:0',
            'remarks' => 'nullable|string',
        ]);

        // Authorization check
        $exam = Exam::with('batch.course')->find($validated['exam_id']);
        abort_if(! $exam || $exam->batch->course->user_id !== $userId, 403, 'Unauthorized action.');

        Result::updateOrCreate(
            ['exam_id' => $validated['exam_id'], 'student_id' => $validated['student_id']],
            $validated
        );

        return redirect()->back()->with('success', 'Result published.');
    }

    public function edit(Request $request, Result $result)
    {
        $userId = $request->user()->id;

        $result->load(['student', 'exam.batch.course']);
        abort_if($result->exam->batch->course->user_id !== $userId, 403, 'Unauthorized action.');

        return Inertia::render('instructor/results/Edit', [
            'result' => $result,
        ]);
    }

    public function update(Request $request, Result $result)
    {
        $userId = $request->user()->id;

        $result->load('exam.batch.course');
        abort_if($result->exam->batch->course->user_id !== $userId, 403, 'Unauthorized action.');

        $validated = $request->validate([
            'marks_obtained' => 'required|numeric|min:0',
            'remarks' => 'nullable|string',
        ]);

        $result->update($validated);

        return redirect()->route('instructor.results.index')->with('success', 'Result updated.');
    }

    public function destroy(Request $request, Result $result)
    {
        $userId = $request->user()->id;

        $result->load('exam.batch.course');
        abort_if($result->exam->batch->course->user_id !== $userId, 403, 'Unauthorized action.');

        $result->delete();

        return redirect()->back()->with('success', 'Result deleted.');
    }
}
