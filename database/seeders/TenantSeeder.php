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
            ['domain' => 'global'],
            [
                'name' => 'Global Coaching Academy',
            ]
        );

        Tenant::firstOrCreate(
            ['domain' => 'acme'],
            [
                'name' => 'Acme Science Hub',
            ]
        );
    }
}
