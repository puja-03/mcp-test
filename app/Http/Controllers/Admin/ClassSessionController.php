<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\ClassSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassSessionController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $batchId = $request->input('batch_id');

        $sessions = ClassSession::with('batch')
            ->when($search, function ($query, $search) {
                $query->where('topic', 'like', "%{$search}%");
            })
            ->when($batchId, function ($query, $batchId) {
                $query->where('batch_id', $batchId);
            })
            ->latest('session_date')
            ->paginate(10)
            ->withQueryString();

        $batches = Batch::select('id', 'name')->get();

        return Inertia::render('admin/class-sessions/Index', [
            'sessions' => $sessions,
            'batches' => $batches,
            'filters' => $request->only(['search', 'batch_id']),
        ]);
    }

    public function create()
    {
        $batches = Batch::select('id', 'name')->get();

        return Inertia::render('admin/class-sessions/Create', [
            'batches' => $batches,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'batch_id' => 'required|exists:batches,id',
            'session_date' => 'required|date',
            'topic' => 'nullable|string|max:500',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
        ]);

        $exists = ClassSession::where('batch_id', $validated['batch_id'])
            ->where('session_date', $validated['session_date'])
            ->exists();
        if ($exists) {
            return back()->withErrors(['session_date' => 'A session for this batch already exists on this date.']);
        }

        ClassSession::create($validated);

        return redirect()->route('admin.class-sessions.index')->with('success', 'Class Session created successfully.');
    }

    public function edit(ClassSession $classSession)
    {
        $batches = Batch::select('id', 'name')->get();

        return Inertia::render('admin/class-sessions/Edit', [
            'session' => $classSession,
            'batches' => $batches,
        ]);
    }

    public function update(Request $request, ClassSession $classSession)
    {
        $validated = $request->validate([
            'session_date' => 'required|date',
            'topic' => 'nullable|string|max:500',
            'start_time' => 'nullable|date_format:H:i:s', // HTML time inputs usually append seconds, or just H:i
            'end_time' => 'nullable|date_format:H:i:s|after:start_time',
        ]);

        // Fix potential time format issue when html returns H:i instead of H:i:s
        // Let's broaden validation just to be safe
        $validated = $request->validate([
            'session_date' => 'required|date',
            'topic' => 'nullable|string|max:500',
            'start_time' => 'nullable',
            'end_time' => 'nullable',
        ]);

        $classSession->update($validated);

        return redirect()->route('admin.class-sessions.index')->with('success', 'Class Session updated successfully.');
    }

    public function destroy(ClassSession $classSession)
    {
        $classSession->delete();

        return redirect()->route('admin.class-sessions.index')->with('success', 'Class Session deleted successfully.');
    }
}
