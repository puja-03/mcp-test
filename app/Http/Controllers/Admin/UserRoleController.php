<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserRoleController extends Controller
{
    public function index(Request $request)
    {
        $users = User::with('role')
            ->when($request->input('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->input('role_id'), function ($query, $roleId) {
                if ($roleId === 'none') {
                    $query->whereNull('role_id');
                } else {
                    $query->where('role_id', $roleId);
                }
            })
            ->latest()
            ->paginate(15)
            ->withQueryString()
            ->through(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_id' => $user->role_id,
                'role' => $user->role ? ['id' => $user->role->id, 'name' => $user->role->name] : null,
                'created_at' => $user->created_at,
            ]);

        $roles = Role::all();

        return Inertia::render('admin/users', [
            'users' => $users,
            'roles' => $roles,
            'filters' => $request->only(['search', 'role_id']),
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
