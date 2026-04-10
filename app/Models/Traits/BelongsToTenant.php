<?php

namespace App\Models\Traits;

use App\Models\Tenant;
use App\Models\Scopes\TenantScope;
use Illuminate\Database\Eloquent\Model;

trait BelongsToTenant
{
    public static function bootBelongsToTenant(): void
    {
        static::addGlobalScope(new TenantScope());

        static::creating(function (Model $model) {
            $tenantId = null;

            if (app()->bound('currentTenant')) {
                $tenant = app('currentTenant');
                if ($tenant) {
                    $tenantId = $tenant->id;
                }
            }

            if (!$tenantId && auth()->check()) {
                $tenantId = auth()->user()->tenant_id;
            }

            // Local dev fallback if no tenant is found in session/user
            if (!$tenantId && app()->environment('local')) {
                $firstTenant = Tenant::first();
                if ($firstTenant) {
                    $tenantId = $firstTenant->id;
                }
            }

            if ($tenantId && empty($model->tenant_id)) {
                $model->tenant_id = $tenantId;
            }
        });
    }

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
