<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\FeeStructure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeeStructureController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $courseId = $request->input('course_id');

        $feeStructures = FeeStructure::with('course')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($courseId, function ($query, $courseId) {
                $query->where('course_id', $courseId);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $courses = Course::select('id', 'name')->get();

        return Inertia::render('admin/fee-structures/Index', [
            'feeStructures' => $feeStructures,
            'courses' => $courses,
            'filters' => $request->only(['search', 'course_id']),
        ]);
    }

    public function create()
    {
        $courses = Course::select('id', 'name')->get();

        return Inertia::render('admin/fee-structures/Create', [
            'courses' => $courses,
        ]);
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

        return redirect()->route('admin.fee-structures.index')->with('success', 'Fee structure created successfully.');
    }

    public function edit(FeeStructure $feeStructure)
    {
        $courses = Course::select('id', 'name')->get();

        return Inertia::render('admin/fee-structures/Edit', [
            'feeStructure' => $feeStructure,
            'courses' => $courses,
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

        return redirect()->route('admin.fee-structures.index')->with('success', 'Fee structure updated successfully.');
    }

    public function destroy(FeeStructure $feeStructure)
    {
        $feeStructure->delete();

        return redirect()->back()->with('success', 'Fee structure deleted.');
    }
}
