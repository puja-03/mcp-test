<?php

use App\Http\Controllers\Admin\AttendanceController;
use App\Http\Controllers\Admin\BatchController;
use App\Http\Controllers\Admin\ClassSessionController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\EnrollmentController;
use App\Http\Controllers\Admin\ExamController;
use App\Http\Controllers\Admin\FeeStructureController;
use App\Http\Controllers\Admin\InstallmentController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\ResultController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Admin\TenantUserController;
use App\Http\Controllers\Admin\UserRoleController;
use App\Http\Controllers\Tenant\DashboardController;
use App\Http\Controllers\Tenant\UserController;
use App\Http\Middleware\CheckRole;
use App\Http\Middleware\TenantResolver;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::middleware([TenantResolver::class])->group(function () {
    Route::inertia('/', 'welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ])->name('home');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');
    });

    // Tenant dashboard (requires auth)
    Route::middleware(['auth', 'verified'])->prefix('tenant')->name('tenant.')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        // Tenant users CRUD
        Route::get('users', [UserController::class, 'index'])->name('users.index');
        Route::post('users', [UserController::class, 'store'])->name('users.store');
        Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    });
    Route::middleware(['auth', 'verified', CheckRole::class.':admin'])->prefix('admin')->name('admin.')->group(function () {
        // Tenant management (admin only)
        Route::get('/tenants', [TenantController::class, 'index'])->name('tenants.index');
        Route::get('/tenants/create', [TenantController::class, 'create'])->name('tenants.create');
        Route::post('/tenants', [TenantController::class, 'store'])->name('tenants.store');
        Route::delete('/tenants/{tenant}', [TenantController::class, 'destroy'])->name('tenants.destroy');
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

        // Academic core
        Route::resource('courses', CourseController::class)->except(['show']);
        Route::resource('batches', BatchController::class)->except(['show']);
        Route::resource('enrollments', EnrollmentController::class)->except(['show']);

        // Attendance
        Route::resource('class-sessions', ClassSessionController::class)->except(['show']);
        Route::resource('attendances', AttendanceController::class)->except(['show']);

        // Financials
        Route::resource('fee-structures', FeeStructureController::class)->except(['show']);
        Route::resource('installments', InstallmentController::class)->except(['show']);
        Route::resource('payments', PaymentController::class)->except(['show']);

        // Exams & Results
        Route::resource('exams', ExamController::class)->except(['show']);
        Route::resource('results', ResultController::class)->except(['show']);
    });

    require __DIR__.'/settings.php';
});
