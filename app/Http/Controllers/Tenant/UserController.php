<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $tenant = app()->bound('currentTenant') ? app('currentTenant') : null;
        if (! $tenant) {
            abort(404, 'Tenant not found');
        }

        $users = User::where('tenant_id', $tenant->id)->with('role')->get();
        $roles = \App\Models\Role::all();

        return Inertia::render('tenant/users', [
            'users' => $users,
            'tenant' => $tenant,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $tenant = app()->bound('currentTenant') ? app('currentTenant') : null;
        if (! $tenant) {
            abort(404, 'Tenant not found');
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'nullable|string|min:6',
            'role_id' => 'nullable|exists:roles,id',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => isset($data['password']) ? Hash::make($data['password']) : Hash::make('password'),
            'tenant_id' => $tenant->id,
            'role_id' => $data['role_id'] ?? null,
        ]);

        return redirect()->back()->with('success', 'User created');
    }

    public function update(Request $request, User $user)
    {
        $tenant = app()->bound('currentTenant') ? app('currentTenant') : null;
        if (! $tenant || $user->tenant_id !== $tenant->id) {
            abort(403);
        }

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:6',
            'role_id' => 'nullable|exists:roles,id',
        ]);

        $update = [];
        if (isset($data['name'])) $update['name'] = $data['name'];
        if (isset($data['email'])) $update['email'] = $data['email'];
        if (! empty($data['password'])) $update['password'] = Hash::make($data['password']);
        if (array_key_exists('role_id', $data)) $update['role_id'] = $data['role_id'];

        $user->update($update);

        return redirect()->back()->with('success', 'User updated');
    }

    public function destroy(User $user)
    {
        $tenant = app()->bound('currentTenant') ? app('currentTenant') : null;
        if (! $tenant || $user->tenant_id !== $tenant->id) {
            abort(403);
        }

        $user->delete();
        return redirect()->back()->with('success', 'User deleted');
    }
}
