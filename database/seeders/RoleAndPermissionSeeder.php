<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Create default permissions
        $permissions = [
            'manage-users',
            'manage-roles',
            'manage-permissions',
            'manage-tenants',
            'view-dashboard',
            'view-admin-panel',
            
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create default roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $tenantAdminRole = Role::firstOrCreate(['name' => 'tenant-admin']);
        $instructorRole = Role::firstOrCreate(['name' => 'instructor']);

        // Assign all permissions to admin
        $adminRole->permissions()->sync(Permission::all()->pluck('id'));

        // Give tenant-admin limited permissions (manage users + view dashboard)
        $tenantAdminRole->permissions()->sync(
            Permission::whereIn('name', ['manage-users', 'view-dashboard'])->pluck('id')
        );

        // Assign only view-dashboard to user
        $userRole->permissions()->sync(
            Permission::where('name', 'view-dashboard')->pluck('id')
        );
    }
}
