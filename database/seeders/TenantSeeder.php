<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tenant::firstOrCreate(
            ['domain' => 'acme'],
            [
                'name' => 'Acme Corporation',
            ]
        );

        Tenant::firstOrCreate(
            ['domain' => 'test'],
            [
                'name' => 'Test Company',
            ]
        );
    }
}
