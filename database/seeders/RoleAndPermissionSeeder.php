<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

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
            'manage-courses',
            'manage-chapters',
            'manage-topics',
            'manage-batches',
            'manage-enrollments',
            'manage-attendance',
            'manage-fees',
            'manage-exams',
            'manage-results',
            'view-courses',
            'view-chapters',
            'view-topics',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create default roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $tenantAdminRole = Role::firstOrCreate(['name' => 'tenant-admin']);
        $instructorRole = Role::firstOrCreate(['name' => 'instructor']);
        $studentRole = Role::firstOrCreate(['name' => 'student']);

        // Assign all permissions to admin
        $adminRole->permissions()->sync(Permission::all()->pluck('id'));

        // Give tenant-admin limited permissions (manage users + view dashboard)
        $tenantAdminRole->permissions()->sync(
            Permission::whereIn('name', [
                'manage-users',
                'view-dashboard',
                'manage-courses',
                'manage-chapters',
                'manage-topics',
                'manage-batches',
                'manage-enrollments',
                'manage-attendance',
                'manage-fees',
                'manage-exams',
                'manage-results',
            ])->pluck('id')
        );

        // Give instructor permissions for course content management
        $instructorRole->permissions()->sync(
            Permission::whereIn('name', [
                'view-dashboard',
                'manage-courses',
                'manage-chapters',
                'manage-topics',
                'manage-attendance',
                'manage-exams',
                'manage-results',
            ])->pluck('id')
        );

        // Give student view-only permissions
        $studentRole->permissions()->sync(
            Permission::whereIn('name', [
                'view-dashboard',
                'view-courses',
                'view-chapters',
                'view-topics',
            ])->pluck('id')
        );

        // Student permissions are already assigned above.
    }
}
