<?php

namespace App\Http\Controllers\Tenant;

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
        $results = Result::with(['exam.batch', 'student'])
            ->when($request->input('exam_id'), fn ($q, $e) => $q->where('exam_id', $e))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('tenant/results/Index', [
            'results' => $results,
            'exams' => Exam::with('batch')->latest('exam_date')->limit(50)->get(),
            'filters' => $request->only(['exam_id']),
        ]);
    }

    public function create(Request $request)
    {
        $exams = Exam::with('batch')->latest('exam_date')->limit(50)->get();
        $students = [];
        if ($request->input('exam_id')) {
            $exam = Exam::find($request->input('exam_id'));
            if ($exam) {
                $students = User::whereHas('enrollments', fn ($q) => $q->where('batch_id', $exam->batch_id)->where('status', 'active'))->get();
            }
        }

        return Inertia::render('tenant/results/Create', [
            'exams' => $exams,
            'students' => $students,
            'selected_exam_id' => $request->input('exam_id'),
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

        Result::create($validated);

        return redirect()->back()->with('success', 'Result saved.');
    }

    public function edit(Result $result)
    {
        return Inertia::render('tenant/results/Edit', ['result' => $result->load(['exam.batch', 'student'])]);
    }

    public function update(Request $request, Result $result)
    {
        $validated = $request->validate([
            'marks_obtained' => 'required|numeric|min:0',
            'remarks' => 'nullable|string',
        ]);

        $result->update($validated);

        return redirect()->route('tenant.results.index', ['exam_id' => $result->exam_id])->with('success', 'Result updated.');
    }

    public function destroy(Result $result)
    {
        $result->delete();

        return redirect()->back()->with('success', 'Result deleted.');
    }
}
