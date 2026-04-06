<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserRoleController extends Controller
{
    public function index()
    {
        $users = User::with('role')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_id' => $user->role_id,
                'role' => $user->role ? ['id' => $user->role->id, 'name' => $user->role->name] : null,
                'created_at' => $user->created_at,
            ];
        });

        $roles = Role::all();

        return Inertia::render('admin/users', [
            'users' => $users,
            'roles' => $roles,
        ]);

    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'role_id' => 'nullable|exists:roles,id',
        ]);

        // Only update when the request actually provided a role_id field.
        // Use $request->exists to detect presence even when the value is null.
        if ($request->exists('role_id')) {
            $user->update(['role_id' => $validated['role_id'] ?? $request->input('role_id')]);
        }

        return redirect()->back()->with('success', 'User role updated successfully.');
    }
}
