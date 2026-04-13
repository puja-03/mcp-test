<?php

namespace App\Http\Controllers\Instructor;

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
        $userId = $request->user()->id;

        $attendances = Attendance::with(['classSession.batch', 'student'])
            ->whereHas('classSession.batch.course', fn ($q) => $q->where('user_id', $userId))
            ->when($request->input('session_id'), fn ($q, $s) => $q->where('class_session_id', $s))
            ->when($request->input('status'), fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $sessions = ClassSession::with('batch')
            ->whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))
            ->latest('session_date')
            ->limit(50)
            ->get();

        return Inertia::render('instructor/attendances/Index', [
            'attendances' => $attendances,
            'sessions' => $sessions,
            'filters' => $request->only(['session_id', 'status']),
        ]);
    }

    public function create(Request $request)
    {
        $userId = $request->user()->id;

        $sessions = ClassSession::with('batch')
            ->whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))
            ->latest('session_date')
            ->limit(50)
            ->get();

        $students = [];
        if ($request->input('session_id')) {
            $session = ClassSession::whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))
                ->find($request->input('session_id'));

            if ($session) {
                // Get active students enrolled in this batch
                $students = User::whereHas('enrollments', fn ($q) => $q->where('batch_id', $session->batch_id)->where('status', 'active'))->get();
            }
        }

        return Inertia::render('instructor/attendances/Create', [
            'sessions' => $sessions,
            'students' => $students,
            'selected_session_id' => $request->input('session_id'),
        ]);
    }

    public function store(Request $request)
    {
        $userId = $request->user()->id;

        $validated = $request->validate([
            'class_session_id' => 'required|exists:class_sessions,id',
            'student_id' => 'required|exists:users,id',
            'status' => 'required|in:present,absent,late',
            'remarks' => 'nullable|string',
        ]);

        // Security Check: ensure session belongs to instructor's course
        $session = ClassSession::whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))->find($validated['class_session_id']);
        abort_if(! $session, 403, 'Unauthorized action.');

        Attendance::create($validated);

        return redirect()->back()->with('success', 'Attendance marked.');
    }

    public function destroy(Request $request, Attendance $attendance)
    {
        $userId = $request->user()->id;

        // Security Check: ensure attendance belongs to instructor's course
        $isAuthorized = ClassSession::whereHas('batch.course', fn ($q) => $q->where('user_id', $userId))
            ->where('id', $attendance->class_session_id)
            ->exists();

        abort_if(! $isAuthorized, 403, 'Unauthorized action.');

        $attendance->delete();

        return redirect()->back()->with('success', 'Attendance deleted.');
    }
}
