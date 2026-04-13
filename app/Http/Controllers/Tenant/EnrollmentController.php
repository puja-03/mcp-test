<?php

namespace App\Http\Controllers\Tenant;

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
        $enrollments = Enrollment::with(['student', 'batch.course'])
            ->when($request->input('batch_id'), fn ($q, $b) => $q->where('batch_id', $b))
            ->when($request->input('status'), fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $batches = Batch::with('course')->get();

        return Inertia::render('tenant/enrollments/Index', [
            'enrollments' => $enrollments,
            'batches' => $batches,
            'filters' => $request->only(['batch_id', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('tenant/enrollments/Create', [
            'batches' => Batch::with('course')->get(),
            'students' => User::whereHas('role', fn ($q) => $q->where('name', 'student'))->select('id', 'name', 'email')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:users,id',
            'batch_id' => 'required|exists:batches,id',
            'enrollment_date' => 'nullable|date',
            'status' => 'nullable|string',
        ]);

        Enrollment::create($validated);

        return redirect()->route('tenant.enrollments.index')->with('success', 'Enrollment created.');
    }

    public function edit(Enrollment $enrollment)
    {
        $enrollment->load(['student', 'batch.course']);

        return Inertia::render('tenant/enrollments/Edit', [
            'enrollment' => $enrollment,
            'batches' => Batch::with('course')->get(),
            'students' => User::whereHas('role', fn ($q) => $q->where('name', 'student'))->select('id', 'name', 'email')->get(),
        ]);
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:users,id',
            'batch_id' => 'required|exists:batches,id',
            'status' => 'nullable|string',
        ]);

        $enrollment->update($validated);

        return redirect()->route('tenant.enrollments.index')->with('success', 'Enrollment updated.');
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return redirect()->route('tenant.enrollments.index')->with('success', 'Enrollment deleted.');
    }
}
