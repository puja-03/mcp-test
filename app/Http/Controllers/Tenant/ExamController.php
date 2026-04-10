<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function index(Request $request)
    {
        $exams = Exam::with('batch')
            ->when($request->input('search'), fn ($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->when($request->input('batch_id'), fn ($q, $b) => $q->where('batch_id', $b))
            ->latest('exam_date')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('tenant/exams/Index', [
            'exams' => $exams,
            'batches' => Batch::select('id', 'name')->get(),
            'filters' => $request->only(['search', 'batch_id']),
        ]);
    }

    public function create()
    {
        return Inertia::render('tenant/exams/Create', ['batches' => Batch::select('id', 'name')->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'batch_id' => 'required|exists:batches,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'exam_date' => 'required|date',
            'max_marks' => 'required|numeric|min:1',
            'passing_marks' => 'nullable|numeric|min:0|lte:max_marks',
        ]);

        Exam::create($validated);

        return redirect()->route('tenant.exams.index')->with('success', 'Exam created.');
    }

    public function edit(Exam $exam)
    {
        return Inertia::render('tenant/exams/Edit', ['exam' => $exam, 'batches' => Batch::select('id', 'name')->get()]);
    }

    public function update(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'batch_id' => 'required|exists:batches,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'exam_date' => 'required|date',
            'max_marks' => 'required|numeric|min:1',
            'passing_marks' => 'nullable|numeric|min:0|lte:max_marks',
        ]);

        $exam->update($validated);

        return redirect()->route('tenant.exams.index')->with('success', 'Exam updated.');
    }

    public function destroy(Exam $exam)
    {
        $exam->delete();

        return redirect()->route('tenant.exams.index')->with('success', 'Exam deleted.');
    }
}
