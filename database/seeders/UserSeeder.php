<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenant = Tenant::where('domain', 'global')->first();
        $adminRole = Role::where('name', 'admin')->first();
        $tenantAdminRole = Role::where('name', 'tenant-admin')->first();
        $instructorRole = Role::where('name', 'instructor')->first();
        $studentRole = Role::where('name', 'student')->first();

        // 1. Global Admin (No Tenant)
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Global Admin',
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id,
            ]
        );

        // 2. Tenant Admin
        User::firstOrCreate(
            ['email' => 'tenant@example.com'],
            [
                'name' => 'Branch Manager',
                'password' => Hash::make('password'),
                'tenant_id' => $tenant->id,
                'role_id' => $tenantAdminRole->id,
            ]
        );

        // 3. Instructor
        User::firstOrCreate(
            ['email' => 'instructor@example.com'],
            [
                'name' => 'Prof. John Doe',
                'password' => Hash::make('password'),
                'tenant_id' => $tenant->id,
                'role_id' => $instructorRole->id,
            ]
        );

        // 4. Student
        User::firstOrCreate(
            ['email' => 'student@example.com'],
            [
                'name' => 'Jane Student',
                'password' => Hash::make('password'),
                'tenant_id' => $tenant->id,
                'role_id' => $studentRole->id,
            ]
        );

        // 5. Acme Tenant Admin
        $acmeTenant = Tenant::where('domain', 'acme')->first();
        if ($acmeTenant) {
            User::firstOrCreate(
                ['email' => 'acme@example.com'],
                [
                    'name' => 'Acme Admin',
                    'password' => Hash::make('password'),
                    'tenant_id' => $acmeTenant->id,
                    'role_id' => $tenantAdminRole->id,
                ]
            );
        }
    }
}
