<?php

namespace App\Http\Controllers\Admin;

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
        $examId = $request->input('exam_id');

        $results = Result::with(['exam.batch', 'student'])
            ->when($examId, function ($query, $examId) {
                $query->where('exam_id', $examId);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $exams = Exam::with('batch')->latest('exam_date')->limit(50)->get();

        return Inertia::render('admin/results/Index', [
            'results' => $results,
            'exams' => $exams,
            'filters' => $request->only(['exam_id']),
        ]);
    }

    public function create(Request $request)
    {
        $examId = $request->input('exam_id');
        $exams = Exam::with('batch')->latest('exam_date')->limit(50)->get();

        $students = [];
        if ($examId) {
            $exam = Exam::find($examId);
            if ($exam) {
                $students = User::whereHas('enrollments', function ($q) use ($exam) {
                    $q->where('batch_id', $exam->batch_id)->where('status', 'active');
                })->get();
            }
        }

        return Inertia::render('admin/results/Create', [
            'exams' => $exams,
            'students' => $students,
            'selected_exam_id' => $examId,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'student_id' => 'required|exists:users,id',
            'marks_obtained' => 'required|numeric|min:0',
            'remarks' => 'nullable|string',
        ]);

        $exam = Exam::findOrFail($validated['exam_id']);
        if ($validated['marks_obtained'] > $exam->max_marks) {
            return back()->withErrors(['marks_obtained' => 'Marks obtained cannot exceed max marks ('.$exam->max_marks.').']);
        }

        $exists = Result::where('exam_id', $validated['exam_id'])
            ->where('student_id', $validated['student_id'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['student_id' => 'Result already recorded for this student in this exam.']);
        }

        Result::create($validated);

        return redirect()->back()->with('success', 'Result saved.');
    }

    public function edit(Result $result)
    {
        $result->load(['exam.batch', 'student']);

        return Inertia::render('admin/results/Edit', [
            'result' => $result,
        ]);
    }

    public function update(Request $request, Result $result)
    {
        $validated = $request->validate([
            'marks_obtained' => 'required|numeric|min:0',
            'remarks' => 'nullable|string',
        ]);

        $exam = $result->exam;
        if ($validated['marks_obtained'] > $exam->max_marks) {
            return back()->withErrors(['marks_obtained' => 'Marks obtained cannot exceed max marks ('.$exam->max_marks.').']);
        }

        $result->update($validated);

        return redirect()->route('admin.results.index', ['exam_id' => $result->exam_id])->with('success', 'Result updated.');
    }

    public function destroy(Result $result)
    {
        $result->delete();

        return redirect()->back()->with('success', 'Result deleted.');
    }
}
