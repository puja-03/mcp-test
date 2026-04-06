<?php

use App\Http\Controllers\Admin\RoleController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\Admin\UserRoleController;              
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\TenantUserController;
use App\Http\Middleware\TenantResolver;
    
Route::middleware([TenantResolver::class])->group(function () {
    Route::inertia('/', 'welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ])->name('home');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');
    });

    // Tenant dashboard (requires auth)
    Route::middleware(['auth', 'verified'])->prefix('tenant')->name('tenant.')->group(function () {
        Route::get('dashboard', [\App\Http\Controllers\Tenant\DashboardController::class, 'index'])->name('dashboard');
        // Tenant users CRUD
        Route::get('users', [\App\Http\Controllers\Tenant\UserController::class, 'index'])->name('users.index');
        Route::post('users', [\App\Http\Controllers\Tenant\UserController::class, 'store'])->name('users.store');
        Route::put('users/{user}', [\App\Http\Controllers\Tenant\UserController::class, 'update'])->name('users.update');
        Route::delete('users/{user}', [\App\Http\Controllers\Tenant\UserController::class, 'destroy'])->name('users.destroy');
    });
     Route::middleware(['auth', 'verified',CheckRole::class.':admin'])->prefix('admin')->name('admin.')->group(function () {
        // Tenant management (admin only)
        Route::get('/tenants', [\App\Http\Controllers\Admin\TenantController::class, 'index'])->name('tenants.index');
        Route::get('/tenants/create', [\App\Http\Controllers\Admin\TenantController::class, 'create'])->name('tenants.create');
        Route::post('/tenants', [\App\Http\Controllers\Admin\TenantController::class, 'store'])->name('tenants.store');
        Route::delete('/tenants/{tenant}', [\App\Http\Controllers\Admin\TenantController::class, 'destroy'])->name('tenants.destroy');
        Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
        Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
        Route::put('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
        Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

        Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index');
        Route::post('/permissions', [PermissionController::class, 'store'])->name('permissions.store');
        Route::put('/permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
        Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');

        Route::get('/users', [UserRoleController::class, 'index'])->name('users.index');
        Route::put('/users/{user}', [UserRoleController::class, 'update'])->name('users.update');
        
        // Admin manage users for a specific tenant
        Route::get('/tenants/{tenant}/users', [TenantUserController::class, 'index'])->name('tenants.users.index');
        Route::post('/tenants/{tenant}/users', [TenantUserController::class, 'store'])->name('tenants.users.store');
        Route::put('/tenants/{tenant}/users/{user}', [TenantUserController::class, 'update'])->name('tenants.users.update');
        Route::delete('/tenants/{tenant}/users/{user}', [TenantUserController::class, 'destroy'])->name('tenants.users.destroy');
    });
    
    require __DIR__.'/settings.php';
});
