<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;

class TenantResolver
{
    public function handle(Request $request, Closure $next)
    {
        $host = $request->getHost();
        $tenant = null;

        // Try subdomain (tenant.example.com -> tenant)
        $parts = explode('.', $host);
        $subdomain = null;
        if (count($parts) > 2) {
            $subdomain = $parts[0];
        } else {
            // Fallback: try full host match
            $subdomain = $host;
        }

        if ($subdomain) {
            $tenant = Tenant::where('domain', $subdomain)->first();
        }

        if ($tenant) {
            app()->instance('currentTenant', $tenant);
        }

        return $next($request);
    }
}
