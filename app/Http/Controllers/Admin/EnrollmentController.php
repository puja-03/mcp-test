<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');
        $batchId = $request->input('batch_id');

        $enrollments = Enrollment::with(['student', 'batch'])
            ->when($search, function ($query, $search) {
                $query->whereHas('student', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($batchId, function ($query, $batchId) {
                $query->where('batch_id', $batchId);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $batches = Batch::select('id', 'name')->get();

        return Inertia::render('admin/enrollments/Index', [
            'enrollments' => $enrollments,
            'batches' => $batches,
            'filters' => $request->only(['search', 'status', 'batch_id']),
        ]);
    }

    public function create()
    {
        $batches = Batch::select('id', 'name')->get();
        // Find users without teacher role maybe or just all users for simplicity
        $students = User::select('id', 'name', 'email')->get();

        return Inertia::render('admin/enrollments/Create', [
            'batches' => $batches,
            'students' => $students,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:users,id',
            'batch_id' => 'required|exists:batches,id',
            'enrollment_date' => 'required|date',
            'status' => 'required|string|in:active,dropped,completed,pending',
        ]);

        // Check for duplicates
        $exists = Enrollment::where('student_id', $validated['student_id'])
            ->where('batch_id', $validated['batch_id'])
            ->exists();
        if ($exists) {
            return back()->withErrors(['student_id' => 'This student is already enrolled in this batch.']);
        }

        Enrollment::create($validated);

        // Update batch enrollment count
        $batch = Batch::find($validated['batch_id']);
        $batch->increment('enrolled_count');

        return redirect()->route('admin.enrollments.index')->with('success', 'Enrollment created successfully.');
    }

    public function edit(Enrollment $enrollment)
    {
        $batches = Batch::select('id', 'name')->get();
        $students = User::select('id', 'name', 'email')->get();

        return Inertia::render('admin/enrollments/Edit', [
            'enrollment' => $enrollment,
            'batches' => $batches,
            'students' => $students,
        ]);
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:active,dropped,completed,pending',
            'enrollment_date' => 'required|date',
        ]);

        if ($validated['status'] === 'dropped' && $enrollment->status !== 'dropped') {
            $validated['dropped_at'] = now();
        } elseif ($validated['status'] !== 'dropped') {
            $validated['dropped_at'] = null;
        }

        $enrollment->update($validated);

        return redirect()->route('admin.enrollments.index')->with('success', 'Enrollment updated successfully.');
    }

    public function destroy(Enrollment $enrollment)
    {
        $batchId = $enrollment->batch_id;
        $enrollment->delete();

        // Update batch enrollment count
        $batch = Batch::find($batchId);
        if ($batch && $batch->enrolled_count > 0) {
            $batch->decrement('enrolled_count');
        }

        return redirect()->route('admin.enrollments.index')->with('success', 'Enrollment deleted successfully.');
    }
}
