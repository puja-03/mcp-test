<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\ClassSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassSessionController extends Controller
{
    public function index(Request $request)
    {
        $sessions = ClassSession::with('batch')
            ->when($request->input('batch_id'), fn ($q, $b) => $q->where('batch_id', $b))
            ->latest('session_date')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('tenant/class-sessions/Index', [
            'sessions' => $sessions,
            'batches' => Batch::select('id', 'name')->get(),
            'filters' => $request->only(['batch_id']),
        ]);
    }

    public function create()
    {
        return Inertia::render('tenant/class-sessions/Create', ['batches' => Batch::select('id', 'name')->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'batch_id' => 'required|exists:batches,id',
            'session_date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'topic' => 'nullable|string|max:255',
        ]);

        ClassSession::create($validated);

        return redirect()->route('tenant.class-sessions.index')->with('success', 'Session created.');
    }

    public function edit(ClassSession $classSession)
    {
        return Inertia::render('tenant/class-sessions/Edit', [
            'session' => $classSession,
            'batches' => Batch::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, ClassSession $classSession)
    {
        $validated = $request->validate([
            'batch_id' => 'required|exists:batches,id',
            'session_date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'topic' => 'nullable|string|max:255',
        ]);

        $classSession->update($validated);

        return redirect()->route('tenant.class-sessions.index')->with('success', 'Session updated.');
    }

    public function destroy(ClassSession $classSession)
    {
        $classSession->delete();

        return redirect()->route('tenant.class-sessions.index')->with('success', 'Session deleted.');
    }
}
