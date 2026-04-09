<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BatchController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');
        $courseId = $request->input('course_id');

        $batches = Batch::with(['course'])
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('batch_code', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($courseId, function ($query, $courseId) {
                $query->where('course_id', $courseId);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $courses = Course::select('id', 'name')->get();

        return Inertia::render('admin/batches/Index', [
            'batches' => $batches,
            'courses' => $courses,
            'filters' => $request->only(['search', 'status', 'course_id']),
        ]);
    }

    public function create()
    {
        $courses = Course::select('id', 'name')->get();
        // Assume teachers have a specific role or just all users for now
        $teachers = User::whereHas('role', function ($q) {
            $q->whereIn('name', ['teacher', 'admin']); // basic approximation
        })->select('id', 'name')->get();

        return Inertia::render('admin/batches/Create', [
            'courses' => $courses,
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'name' => 'required|string|max:255',
            'batch_code' => 'nullable|string|max:50',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'capacity' => 'nullable|integer|min:1',
            'status' => 'required|in:upcoming,active,completed,cancelled',
            'teacher_ids' => 'nullable|array',
            'teacher_ids.*' => 'exists:users,id',
        ]);

        $batch = Batch::create($validated);

        if (! empty($validated['teacher_ids'])) {
            $batch->teachers()->sync($validated['teacher_ids']);
        }

        return redirect()->route('admin.batches.index')->with('success', 'Batch created successfully.');
    }

    public function edit(Batch $batch)
    {
        $batch->load('teachers');
        $courses = Course::select('id', 'name')->get();
        $teachers = User::whereHas('role', function ($q) {
            $q->whereIn('name', ['teacher', 'admin']);
        })->select('id', 'name')->get();

        return Inertia::render('admin/batches/Edit', [
            'batch' => $batch,
            'courses' => $courses,
            'teachers' => $teachers,
            'selectedTeachers' => $batch->teachers->pluck('id')->toArray(),
        ]);
    }

    public function update(Request $request, Batch $batch)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'name' => 'required|string|max:255',
            'batch_code' => 'nullable|string|max:50',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'capacity' => 'nullable|integer|min:1',
            'status' => 'required|in:upcoming,active,completed,cancelled',
            'teacher_ids' => 'nullable|array',
            'teacher_ids.*' => 'exists:users,id',
        ]);

        $batch->update($validated);

        if (isset($validated['teacher_ids'])) {
            $batch->teachers()->sync($validated['teacher_ids']);
        } else {
            $batch->teachers()->sync([]);
        }

        return redirect()->route('admin.batches.index')->with('success', 'Batch updated successfully.');
    }

    public function destroy(Batch $batch)
    {
        $batch->delete();

        return redirect()->route('admin.batches.index')->with('success', 'Batch deleted successfully.');
    }
}
