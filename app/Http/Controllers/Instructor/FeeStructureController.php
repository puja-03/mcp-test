<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\FeeStructure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeeStructureController extends Controller
{
    public function index(Request $request)
    {
        $instructorId = auth()->id();

        $feeStructures = FeeStructure::with('course')
            ->whereHas('course', function ($query) use ($instructorId) {
                $query->where('user_id', $instructorId);
            })
            ->when($request->input('search'), fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('instructor/fee-structures/Index', [
            'feeStructures' => $feeStructures,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $instructorId = auth()->id();

        $courses = Course::where('user_id', $instructorId)
            ->select('id', 'name')->get();

        return Inertia::render('instructor/fee-structures/Create', [
            'courses' => $courses,
        ]);
    }

    public function store(Request $request)
    {
        $instructorId = auth()->id();

        $validated = $request->validate([
            'course_id' => [
                'required',
                'exists:courses,id',
                function ($attribute, $value, $fail) use ($instructorId) {
                    $ownsCourse = Course::where('id', $value)
                        ->where('user_id', $instructorId)
                        ->exists();
                    if (! $ownsCourse) {
                        $fail('You are not authorized to create fee structures for this course.');
                    }
                },
            ],
            'name' => 'required|string|max:255',
            'total_amount' => 'required|numeric|min:0',
            'installment_count' => 'required|integer|min:1',
        ]);

        FeeStructure::create($validated);

        return redirect()->route('instructor.fee-structures.index')->with('success', 'Fee structure created.');
    }

    public function edit(FeeStructure $feeStructure)
    {
        $instructorId = auth()->id();

        // Check if instructor has access to this fee structure's course
        $hasAccess = $feeStructure->course()->where('user_id', $instructorId)->exists();

        if (! $hasAccess) {
            abort(403);
        }

        $courses = Course::where('user_id', $instructorId)
            ->select('id', 'name')->get();

        return Inertia::render('instructor/fee-structures/Edit', [
            'feeStructure' => $feeStructure,
            'courses' => $courses,
        ]);
    }

    public function update(Request $request, FeeStructure $feeStructure)
    {
        $instructorId = auth()->id();

        // Check if instructor has access to this fee structure's course
        $hasAccess = $feeStructure->course()->where('user_id', $instructorId)->exists();

        if (! $hasAccess) {
            abort(403);
        }

        $validated = $request->validate([
            'course_id' => [
                'required',
                'exists:courses,id',
                function ($attribute, $value, $fail) use ($instructorId) {
                    $ownsCourse = Course::where('id', $value)
                        ->where('user_id', $instructorId)
                        ->exists();
                    if (! $ownsCourse) {
                        $fail('You are not authorized to update fee structures for this course.');
                    }
                },
            ],
            'name' => 'required|string|max:255',
            'total_amount' => 'required|numeric|min:0',
            'installment_count' => 'required|integer|min:1',
        ]);

        $feeStructure->update($validated);

        return redirect()->route('instructor.fee-structures.index')->with('success', 'Fee structure updated.');
    }

    public function destroy(FeeStructure $feeStructure)
    {
        $instructorId = auth()->id();

        $hasAccess = $feeStructure->course()->where('user_id', $instructorId)->exists();

        if (! $hasAccess) {
            abort(403);
        }

        $feeStructure->delete();

        return redirect()->route('instructor.fee-structures.index')->with('success', 'Fee structure deleted.');
    }
}
