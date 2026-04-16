<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $instructorId = auth()->id();

        $payments = Payment::with('enrollment.student')
            ->whereHas('enrollment.batch.teachers', function ($query) use ($instructorId) {
                $query->where('id', $instructorId);
            })
            ->when($request->input('search'), function ($query, $search) {
                $query->whereHas('enrollment.student', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })->orWhere('transaction_id', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('instructor/payments/Index', [
            'payments' => $payments,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $instructorId = auth()->id();

        $enrollments = Enrollment::with(['student', 'batch'])
            ->whereHas('batch.teachers', function ($query) use ($instructorId) {
                $query->where('id', $instructorId);
            })->get();

        return Inertia::render('instructor/payments/Create', [
            'enrollments' => $enrollments,
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
                        ->whereHas('batch.teachers', function ($query) use ($instructorId) {
                            $query->where('id', $instructorId);
                        })->exists();
                    if (! $hasAccess) {
                        $fail('Unauthorized enrollment.');
                    }
                },
            ],
            'amount' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'payment_method' => 'required|string',
            'transaction_id' => 'nullable|string|max:255',
            'status' => 'required|in:pending,completed,failed,refunded',
            'notes' => 'nullable|string',
        ]);

        Payment::create($validated);

        return redirect()->route('instructor.payments.index')->with('success', 'Payment recorded.');
    }

    public function edit(Payment $payment)
    {
        $instructorId = auth()->id();

        $hasAccess = $payment->enrollment()->whereHas('batch.teachers', function ($query) use ($instructorId) {
            $query->where('id', $instructorId);
        })->exists();

        if (! $hasAccess) {
            abort(403);
        }

        $enrollments = Enrollment::with(['student', 'batch'])
            ->whereHas('batch.teachers', function ($query) use ($instructorId) {
                $query->where('id', $instructorId);
            })->get();

        return Inertia::render('instructor/payments/Edit', [
            'payment' => $payment,
            'enrollments' => $enrollments,
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $instructorId = auth()->id();

        $hasAccess = $payment->enrollment()->whereHas('batch.teachers', function ($query) use ($instructorId) {
            $query->where('id', $instructorId);
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
                        ->whereHas('batch.teachers', function ($query) use ($instructorId) {
                            $query->where('id', $instructorId);
                        })->exists();
                    if (! $hasAccess) {
                        $fail('Unauthorized enrollment.');
                    }
                },
            ],
            'amount' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'payment_method' => 'required|string',
            'transaction_id' => 'nullable|string|max:255',
            'status' => 'required|in:pending,completed,failed,refunded',
            'notes' => 'nullable|string',
        ]);

        $payment->update($validated);

        return redirect()->route('instructor.payments.index')->with('success', 'Payment updated.');
    }

    public function destroy(Payment $payment)
    {
        $instructorId = auth()->id();

        $hasAccess = $payment->enrollment()->whereHas('batch.teachers', function ($query) use ($instructorId) {
            $query->where('id', $instructorId);
        })->exists();

        if (! $hasAccess) {
            abort(403);
        }

        $payment->delete();

        return redirect()->route('instructor.payments.index')->with('success', 'Payment deleted.');
    }
}
