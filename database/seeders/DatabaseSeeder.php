<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // Ensure roles and permissions exist before creating the admin user
        $this->call([
            RoleAndPermissionSeeder::class,
            AdminSeeder::class,
        ]);

        // Create a test user only if it doesn't already exist
        \App\Models\User::firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'name' => 'Test User',
        ]);

    }
}