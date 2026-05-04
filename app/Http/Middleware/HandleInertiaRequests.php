<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user() ? array_merge($request->user()->toArray(), [
                    'role' => $request->user()->role ? $request->user()->role->name : null,
                    'permissions' => $request->user()->role ? $request->user()->role->permissions->pluck('name')->toArray() : [],
                ]) : null,
            ],
            'branding' => [
                'name' => app()->has('currentTenant') ? app('currentTenant')->name : config('app.name'),
                'logo_url' => app()->has('currentTenant') ? app('currentTenant')->logo_url : null,
                'primary_color' => app()->has('currentTenant') ? app('currentTenant')->primary_color : '#4f46e5',
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
