<?php

namespace App\Http\Controllers\Tenant;

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
        $attendances = Attendance::with(['classSession.batch', 'student'])
            ->when($request->input('session_id'), fn ($q, $s) => $q->where('class_session_id', $s))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $sessions = ClassSession::with('batch')->latest('session_date')->limit(50)->get();

        return Inertia::render('tenant/attendances/Index', [
            'attendances' => $attendances,
            'sessions' => $sessions,
            'filters' => $request->only(['session_id']),
        ]);
    }

    public function create(Request $request)
    {
        $sessions = ClassSession::with('batch')->latest('session_date')->limit(50)->get();
        $students = [];
        if ($request->input('session_id')) {
            $session = ClassSession::find($request->input('session_id'));
            if ($session) {
                $students = User::whereHas('enrollments', fn ($q) => $q->where('batch_id', $session->batch_id)->where('status', 'active'))->get();
            }
        }

        return Inertia::render('tenant/attendances/Create', [
            'sessions' => $sessions,
            'students' => $students,
            'selected_session_id' => $request->input('session_id'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_session_id' => 'required|exists:class_sessions,id',
            'student_id' => 'required|exists:users,id',
            'status' => 'required|in:present,absent,late',
            'remarks' => 'nullable|string',
        ]);

        Attendance::create($validated);

        return redirect()->back()->with('success', 'Attendance marked.');
    }

    public function destroy(Attendance $attendance)
    {
        $attendance->delete();

        return redirect()->back()->with('success', 'Attendance deleted.');
    }
}
