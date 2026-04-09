<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Installment;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $payments = Payment::with(['enrollment.student', 'enrollment.batch', 'creator'])
            ->when($search, function ($query, $search) {
                $query->where('transaction_id', 'like', "%{$search}%")
                    ->orWhere('receipt_number', 'like', "%{$search}%")
                    ->orWhereHas('enrollment.student', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->latest('payment_date')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/payments/Index', [
            'payments' => $payments,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $enrollments = Enrollment::with(['student', 'batch'])->get();

        return Inertia::render('admin/payments/Create', [
            'enrollments' => $enrollments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'enrollment_id' => 'required|exists:enrollments,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_date' => 'required|date',
            'payment_method' => 'nullable|string',
            'transaction_id' => 'nullable|string',
            'receipt_number' => 'nullable|string',
            'notes' => 'nullable|string',
            'status' => 'required|in:pending,completed,failed,refunded',
            'allocate_to_installments' => 'boolean', // auto allocate
        ]);

        $validated['created_by'] = $request->user()->id;

        DB::beginTransaction();
        try {
            $payment = Payment::create($validated);

            // Simple auto-allocation to pending installments if requested
            if ($request->input('allocate_to_installments') && $payment->status === 'completed') {
                $remainingAmount = $payment->amount;

                $pendingInstallments = Installment::where('enrollment_id', $payment->enrollment_id)
                    ->whereIn('status', ['pending', 'overdue'])
                    ->orderBy('due_date', 'asc')
                    ->get();

                foreach ($pendingInstallments as $installment) {
                    if ($remainingAmount <= 0) {
                        break;
                    }

                    // calculate already paid for this installment
                    $paidSoFar = $installment->payments()->sum('allocated_amount');
                    $due = $installment->amount - $paidSoFar;

                    if ($due > 0) {
                        $allocate = min($due, $remainingAmount);
                        $remainingAmount -= $allocate;

                        $payment->installments()->attach($installment->id, ['allocated_amount' => $allocate]);

                        if ($due - $allocate <= 0) {
                            $installment->update(['status' => 'paid']);
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->route('admin.payments.index')->with('success', 'Payment recorded.');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Failed to process payment: '.$e->getMessage()]);
        }
    }

    public function edit(Payment $payment)
    {
        $payment->load('installments');
        $enrollments = Enrollment::with(['student', 'batch'])->get();

        return Inertia::render('admin/payments/Edit', [
            'payment' => $payment,
            'enrollments' => $enrollments,
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'payment_date' => 'required|date',
            'payment_method' => 'nullable|string',
            'transaction_id' => 'nullable|string',
            'receipt_number' => 'nullable|string',
            'notes' => 'nullable|string',
            'status' => 'required|in:pending,completed,failed,refunded',
        ]);

        $payment->update($validated);

        return redirect()->route('admin.payments.index')->with('success', 'Payment updated.');
    }

    public function destroy(Payment $payment)
    {
        // Revert installments status if deleted
        foreach ($payment->installments as $installment) {
            $installment->update(['status' => 'pending']); // simplify reversal
        }
        $payment->delete();

        return redirect()->back()->with('success', 'Payment deleted.');
    }
}
