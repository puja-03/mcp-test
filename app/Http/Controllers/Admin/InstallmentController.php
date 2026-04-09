<?php

namespace App\Http\Controllers\Admin;

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
        $status = $request->input('status');
        $studentId = $request->input('student_id');

        $installments = Installment::with(['enrollment.student', 'enrollment.batch', 'feeStructure'])
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($studentId, function ($query, $studentId) {
                $query->whereHas('enrollment', function ($q) use ($studentId) {
                    $q->where('student_id', $studentId);
                });
            })
            ->latest('due_date')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/installments/Index', [
            'installments' => $installments,
            'filters' => $request->only(['status', 'student_id']),
        ]);
    }

    public function create(Request $request)
    {
        $enrollments = Enrollment::with(['student', 'batch'])->get();
        $feeStructures = FeeStructure::with('course')->get();

        return Inertia::render('admin/installments/Create', [
            'enrollments' => $enrollments,
            'feeStructures' => $feeStructures,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'enrollment_id' => 'required|exists:enrollments,id',
            'fee_structure_id' => 'required|exists:fee_structures,id',
            'due_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,paid,overdue,waived',
        ]);

        Installment::create($validated);

        return redirect()->route('admin.installments.index')->with('success', 'Installment created.');
    }

    public function edit(Installment $installment)
    {
        $enrollments = Enrollment::with(['student', 'batch'])->get();
        $feeStructures = FeeStructure::with('course')->get();

        return Inertia::render('admin/installments/Edit', [
            'installment' => $installment,
            'enrollments' => $enrollments,
            'feeStructures' => $feeStructures,
        ]);
    }

    public function update(Request $request, Installment $installment)
    {
        $validated = $request->validate([
            'due_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,paid,overdue,waived',
        ]);

        $installment->update($validated);

        return redirect()->route('admin.installments.index')->with('success', 'Installment updated.');
    }

    public function destroy(Installment $installment)
    {
        $installment->delete();

        return redirect()->back()->with('success', 'Installment deleted.');
    }
}
