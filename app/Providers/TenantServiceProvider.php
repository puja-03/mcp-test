<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class TenantServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // reserved for tenant-specific bindings later
    }

    public function boot(): void
    {
        // no-op for now; middleware sets the current tenant
    }
}
