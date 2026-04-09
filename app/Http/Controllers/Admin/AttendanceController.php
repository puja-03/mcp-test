<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\ClassSession;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $sessionId = $request->input('class_session_id');

        $attendances = Attendance::with(['classSession.batch', 'student', 'marker'])
            ->when($sessionId, function ($query, $sessionId) {
                $query->where('class_session_id', $sessionId);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $sessions = ClassSession::with('batch')->latest('session_date')->limit(50)->get();

        return Inertia::render('admin/attendances/Index', [
            'attendances' => $attendances,
            'sessions' => $sessions,
            'filters' => $request->only(['class_session_id']),
        ]);
    }

    public function create(Request $request)
    {
        $sessionId = $request->input('class_session_id');
        $sessions = ClassSession::with('batch')->latest('session_date')->limit(50)->get();

        $students = [];
        if ($sessionId) {
            $session = ClassSession::find($sessionId);
            if ($session) {
                $students = User::whereHas('enrollments', function ($q) use ($session) {
                    $q->where('batch_id', $session->batch_id)->where('status', 'active');
                })->get();
            }
        }

        return Inertia::render('admin/attendances/Create', [
            'sessions' => $sessions,
            'students' => $students,
            'selected_session_id' => $sessionId,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_session_id' => 'required|exists:class_sessions,id',
            'student_id' => 'required|exists:users,id',
            'status' => 'required|in:present,absent,late,excused',
            'remarks' => 'nullable|string',
        ]);

        $exists = Attendance::where('class_session_id', $validated['class_session_id'])
            ->where('student_id', $validated['student_id'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['student_id' => 'Attendance already marked for this student in this session.']);
        }

        $validated['marked_by'] = $request->user()->id;

        Attendance::create($validated);

        return redirect()->back()->with('success', 'Attendance marked.');
    }

    public function edit(Attendance $attendance)
    {
        $attendance->load(['classSession.batch', 'student']);

        return Inertia::render('admin/attendances/Edit', [
            'attendance' => $attendance,
        ]);
    }

    public function update(Request $request, Attendance $attendance)
    {
        $validated = $request->validate([
            'status' => 'required|in:present,absent,late,excused',
            'remarks' => 'nullable|string',
        ]);

        $attendance->update($validated);

        return redirect()->route('admin.attendances.index', ['class_session_id' => $attendance->class_session_id])->with('success', 'Attendance updated.');
    }

    public function destroy(Attendance $attendance)
    {
        $attendance->delete();

        return redirect()->back()->with('success', 'Attendance deleted.');
    }
}
