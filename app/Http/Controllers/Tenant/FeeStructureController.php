<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\FeeStructure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeeStructureController extends Controller
{
    public function index(Request $request)
    {
        $feeStructures = FeeStructure::with('course')
            ->when($request->input('search'), fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('tenant/fee-structures/Index', ['feeStructures' => $feeStructures, 'filters' => $request->only(['search'])]);
    }

    public function create()
    {
        return Inertia::render('tenant/fee-structures/Create', ['courses' => Course::select('id', 'name')->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'name' => 'required|string|max:255',
            'total_amount' => 'required|numeric|min:0',
            'installment_count' => 'required|integer|min:1',
        ]);

        FeeStructure::create($validated);

        return redirect()->route('tenant.fee-structures.index')->with('success', 'Fee structure created.');
    }

    public function edit(FeeStructure $feeStructure)
    {
        return Inertia::render('tenant/fee-structures/Edit', [
            'feeStructure' => $feeStructure,
            'courses' => Course::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, FeeStructure $feeStructure)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'name' => 'required|string|max:255',
            'total_amount' => 'required|numeric|min:0',
            'installment_count' => 'required|integer|min:1',
        ]);

        $feeStructure->update($validated);

        return redirect()->route('tenant.fee-structures.index')->with('success', 'Fee structure updated.');
    }

    public function destroy(FeeStructure $feeStructure)
    {
        $feeStructure->delete();

        return redirect()->route('tenant.fee-structures.index')->with('success', 'Fee structure deleted.');
    }
}
