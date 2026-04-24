<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\FeeStructure;
use App\Models\Installment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstallmentController extends Controller
{
    public function index(Request $request)
    {
        $instructorId = auth()->id();

        $installments = Installment::with(['enrollment.student', 'feeStructure'])
            ->whereHas('enrollment.batch.course', function ($query) use ($instructorId) {
                $query->where('user_id', $instructorId);
            })
            ->when($request->input('search'), function ($query, $search) {
                $query->whereHas('enrollment.student', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('instructor/installments/Index', [
            'installments' => $installments,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $instructorId = auth()->id();

        $enrollments = Enrollment::with(['student', 'batch'])
            ->whereHas('batch.course', function ($query) use ($instructorId) {
                $query->where('user_id', $instructorId);
            })->get();

        $feeStructures = FeeStructure::whereHas('course', function ($query) use ($instructorId) {
            $query->where('user_id', $instructorId);
        })->get();

        return Inertia::render('instructor/installments/Create', [
            'enrollments' => $enrollments,
            'feeStructures' => $feeStructures,
        ]);
    }

    public function store(Request $request)
    {
        $instructorId = auth()->id();

        $validated = $request->validate([
            'enrollment_id' => [
                'required',
                'exists:enrollments,id',
                function ($attribute, $value, $fail) use ($instructorId) {
                    $hasAccess = Enrollment::where('id', $value)
                        ->whereHas('batch.course', function ($query) use ($instructorId) {
                            $query->where('user_id', $instructorId);
                        })->exists();
                    if (! $hasAccess) {
                        $fail('Unauthorized enrollment.');
                    }
                },
            ],
            'fee_structure_id' => 'nullable|exists:fee_structures,id',
            'due_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,paid,partially_paid,overdue',
        ]);

        Installment::create($validated);

        return redirect()->route('instructor.installments.index')->with('success', 'Installment created.');
    }

    public function edit(Installment $installment)
    {
        $instructorId = auth()->id();

        $hasAccess = $installment->enrollment()->whereHas('batch.course', function ($query) use ($instructorId) {
            $query->where('user_id', $instructorId);
        })->exists();

        if (! $hasAccess) {
            abort(403);
        }

        $enrollments = Enrollment::with(['student', 'batch'])
            ->whereHas('batch.course', function ($query) use ($instructorId) {
                $query->where('user_id', $instructorId);
            })->get();

        $feeStructures = FeeStructure::whereHas('course', function ($query) use ($instructorId) {
            $query->where('user_id', $instructorId);
        })->get();

        return Inertia::render('instructor/installments/Edit', [
            'installment' => $installment,
            'enrollments' => $enrollments,
            'feeStructures' => $feeStructures,
        ]);
    }

    public function update(Request $request, Installment $installment)
    {
        $instructorId = auth()->id();

        $hasAccess = $installment->enrollment()->whereHas('batch.course', function ($query) use ($instructorId) {
            $query->where('user_id', $instructorId);
        })->exists();

        if (! $hasAccess) {
            abort(403);
        }

        $validated = $request->validate([
            'enrollment_id' => [
                'required',
                'exists:enrollments,id',
                function ($attribute, $value, $fail) use ($instructorId) {
                    $hasAccess = Enrollment::where('id', $value)
                        ->whereHas('batch.course', function ($query) use ($instructorId) {
                            $query->where('user_id', $instructorId);
                        })->exists();
                    if (! $hasAccess) {
                        $fail('Unauthorized enrollment.');
                    }
                },
            ],
            'fee_structure_id' => 'nullable|exists:fee_structures,id',
            'due_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,paid,partially_paid,overdue',
        ]);

        $installment->update($validated);

        return redirect()->route('instructor.installments.index')->with('success', 'Installment updated.');
    }

    public function destroy(Installment $installment)
    {
        $instructorId = auth()->id();

        $hasAccess = $installment->enrollment()->whereHas('batch.course', function ($query) use ($instructorId) {
            $query->where('user_id', $instructorId);
        })->exists();

        if (! $hasAccess) {
            abort(403);
        }

        $installment->delete();

        return redirect()->route('instructor.installments.index')->with('success', 'Installment deleted.');
    }
}
