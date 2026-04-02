<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::withCount('roles')->get();

        return Inertia::render('admin/permissions', [
            'permissions' => $permissions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);

        Permission::create(['name' => $validated['name']]);

        return redirect()->back()->with('success', 'Permission created successfully.');
    }

    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,'.$permission->id,
        ]);

        $permission->update(['name' => $validated['name']]);

        return redirect()->back()->with('success', 'Permission updated successfully.');
    }

    public function destroy(Permission $permission)
    {
        if ($permission->roles()->count() > 0) {
            return redirect()->back()->withErrors(['error' => 'Cannot delete a permission that is assigned to roles.']);
        }

        $permission->delete();

        return redirect()->back()->with('success', 'Permission deleted successfully.');
    }
}
