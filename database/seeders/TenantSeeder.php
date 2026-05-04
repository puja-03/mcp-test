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
                'email' => 'contact@globalcoaching.com',
                'phone' => '+1 (555) 012-3456',
                'address' => '123 Education Plaza, New York, NY 10001',
                'description' => 'A premier global institution for professional coaching and leadership development.',
                'primary_color' => '#4f46e5',
                'secondary_color' => '#0ea5e9',
            ]
        );

        Tenant::firstOrCreate(
            ['domain' => 'acme'],
            [
                'name' => 'Acme Science Hub',
                'email' => 'info@acmescience.edu',
                'phone' => '+1 (555) 987-6543',
                'address' => '456 Innovation Way, San Francisco, CA 94105',
                'description' => 'Dedicated to excellence in scientific education and research mentorship.',
                'primary_color' => '#059669',
                'secondary_color' => '#10b981',
            ]
        );
    }
}
