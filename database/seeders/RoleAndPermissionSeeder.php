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
            'view-dashboard',
            'view-admin-panel',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create default roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Assign all permissions to admin
        $adminRole->permissions()->sync(Permission::all()->pluck('id'));

        // Assign only view-dashboard to user
        $userRole->permissions()->sync(
            Permission::where('name', 'view-dashboard')->pluck('id')
        );

        // Create admin user if it doesn't exist
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->update(['role_id' => $adminRole->id]);
    }
}
