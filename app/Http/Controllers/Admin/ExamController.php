<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $batchId = $request->input('batch_id');

        $exams = Exam::with('batch')
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->when($batchId, function ($query, $batchId) {
                $query->where('batch_id', $batchId);
            })
            ->latest('exam_date')
            ->paginate(15)
            ->withQueryString();

        $batches = Batch::select('id', 'name')->get();

        return Inertia::render('admin/exams/Index', [
            'exams' => $exams,
            'batches' => $batches,
            'filters' => $request->only(['search', 'batch_id']),
        ]);
    }

    public function create()
    {
        $batches = Batch::select('id', 'name')->get();

        return Inertia::render('admin/exams/Create', [
            'batches' => $batches,
        ]);
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

        return redirect()->route('admin.exams.index')->with('success', 'Exam created successfully.');
    }

    public function edit(Exam $exam)
    {
        $batches = Batch::select('id', 'name')->get();

        return Inertia::render('admin/exams/Edit', [
            'exam' => $exam,
            'batches' => $batches,
        ]);
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

        return redirect()->route('admin.exams.index')->with('success', 'Exam updated successfully.');
    }

    public function destroy(Exam $exam)
    {
        $exam->delete();

        return redirect()->back()->with('success', 'Exam deleted successfully.');
    }
}
