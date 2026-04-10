<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BatchController extends Controller
{
    public function index(Request $request)
    {
        $batches = Batch::with('course')
            ->when($request->input('search'), fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('tenant/batches/Index', ['batches' => $batches, 'filters' => $request->only(['search'])]);
    }

    public function create()
    {
        return Inertia::render('tenant/batches/Create', ['courses' => Course::select('id', 'name')->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'max_students' => 'nullable|integer|min:1',
            'status' => 'nullable|string',
        ]);

        Batch::create($validated);

        return redirect()->route('tenant.batches.index')->with('success', 'Batch created.');
    }

    public function edit(Batch $batch)
    {
        return Inertia::render('tenant/batches/Edit', ['batch' => $batch, 'courses' => Course::select('id', 'name')->get()]);
    }

    public function update(Request $request, Batch $batch)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'max_students' => 'nullable|integer|min:1',
            'status' => 'nullable|string',
        ]);

        $batch->update($validated);

        return redirect()->route('tenant.batches.index')->with('success', 'Batch updated.');
    }

    public function destroy(Batch $batch)
    {
        $batch->delete();

        return redirect()->route('tenant.batches.index')->with('success', 'Batch deleted.');
    }
}
