<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $instructorId = auth()->id();

        $users = User::whereHas('role', fn ($q) => $q->where('name', 'student'))
            ->whereHas('enrollments.batch.teachers', function ($query) use ($instructorId) {
                $query->where('id', $instructorId);
            })
            ->when($request->input('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('instructor/users/Index', [
            'users' => $users,
            'filters' => $request->only(['search']),
        ]);
    }

    public function show(User $user)
    {
        $instructorId = auth()->id();

        // Ensure the instructor has access to this student
        $hasAccess = User::whereHas('role', fn ($q) => $q->where('name', 'student'))
            ->where('id', $user->id)
            ->whereHas('enrollments.batch.teachers', function ($query) use ($instructorId) {
                $query->where('id', $instructorId);
            })
            ->exists();

        if (! $hasAccess) {
            abort(403, 'Unauthorized access to student data.');
        }

        $user->load([
            'enrollments.batch.course',
            'attendances.session',
            'results.exam',
        ]);

        return Inertia::render('instructor/users/Show', [
            'user' => $user,
        ]);
    }
}
