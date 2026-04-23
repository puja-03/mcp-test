<?php

use App\Http\Controllers\Admin\AttendanceController;
use App\Http\Controllers\Admin\BatchController;
use App\Http\Controllers\Admin\ChapterController;
use App\Http\Controllers\Admin\ClassSessionController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\EnrollmentController;
use App\Http\Controllers\Admin\ExamController;
use App\Http\Controllers\Admin\FeeStructureController;
use App\Http\Controllers\Admin\InstallmentController;
use App\Http\Controllers\Admin\InstructorProfileController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\ResultController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Admin\TenantUserController;
use App\Http\Controllers\Admin\TopicController;
use App\Http\Controllers\Admin\UserRoleController;
use App\Http\Controllers\Instructor\ProfileController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
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
        Route::get('dashboard', function () {
            if (auth()->user()->hasRole('admin')) {
                return redirect()->route('admin.dashboard');
            }
            if (auth()->user()->hasRole('tenant-admin')) {
                return redirect()->route('tenant.dashboard');
            }
            if (auth()->user()->hasRole('instructor')) {
                return redirect()->route('instructor.profile.edit');
            }
            if (auth()->user()->hasRole('student')) {
                return redirect()->route('student.dashboard');
            }
            return redirect()->route('home');
        })->name('dashboard');
    });

    // ─── TENANT ADMIN PANEL ───
    Route::middleware(['auth', 'verified', CheckRole::class.':tenant-admin'])
        ->prefix('tenant')
        ->name('tenant.')
        ->group(function () {
            Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
            Route::get('users', [UserController::class, 'index'])->name('users.index');
            Route::post('users', [UserController::class, 'store'])->name('users.store');
            Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
            Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

            Route::resource('courses', App\Http\Controllers\Tenant\CourseController::class)->except(['show']);
            Route::resource('batches', App\Http\Controllers\Tenant\BatchController::class)->except(['show']);
            Route::resource('enrollments', App\Http\Controllers\Tenant\EnrollmentController::class)->except(['show']);
            Route::resource('chapters', App\Http\Controllers\Tenant\ChapterController::class)->except(['show']);
            Route::resource('topics', App\Http\Controllers\Tenant\TopicController::class)->except(['show']);
            Route::resource('class-sessions', App\Http\Controllers\Tenant\ClassSessionController::class)->except(['show']);
            Route::resource('attendances', App\Http\Controllers\Tenant\AttendanceController::class)->except(['show', 'edit', 'update']);
            Route::resource('fee-structures', App\Http\Controllers\Tenant\FeeStructureController::class)->except(['show']);
            Route::resource('instructors', App\Http\Controllers\Tenant\InstructorController::class)->except(['show']);
            Route::resource('exams', App\Http\Controllers\Tenant\ExamController::class)->except(['show']);
            Route::resource('results', App\Http\Controllers\Tenant\ResultController::class)->except(['show']);
        });

    // ─── INSTRUCTOR PANEL ───
    Route::middleware(['auth', 'verified', CheckRole::class.':instructor'])
        ->prefix('instructor')
        ->name('instructor.')
        ->group(function () {
            Route::resource('users', App\Http\Controllers\Instructor\UserController::class)->only(['index', 'show']);
            Route::resource('courses', App\Http\Controllers\Instructor\CourseController::class)->only(['index', 'show', 'edit', 'update']);
            Route::resource('chapters', App\Http\Controllers\Instructor\ChapterController::class)->except(['show']);
            Route::resource('topics', App\Http\Controllers\Instructor\TopicController::class)->except(['show']);
            Route::resource('attendances', App\Http\Controllers\Instructor\AttendanceController::class)->except(['show']);
            Route::resource('fee-structures', App\Http\Controllers\Instructor\FeeStructureController::class)->except(['show']);
            Route::resource('installments', App\Http\Controllers\Instructor\InstallmentController::class)->except(['show']);
            Route::resource('payments', App\Http\Controllers\Instructor\PaymentController::class)->except(['show']);
            Route::resource('exams', App\Http\Controllers\Instructor\ExamController::class)->except(['show']);
            Route::resource('results', App\Http\Controllers\Instructor\ResultController::class)->except(['show']);
            Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
        });

    // ─── STUDENT PANEL ───
    Route::middleware(['auth', 'verified', CheckRole::class.':student'])
        ->prefix('student')
        ->name('student.')
        ->group(function () {
            Route::get('dashboard', [App\Http\Controllers\Student\DashboardController::class, 'index'])->name('dashboard');
            Route::get('courses', [App\Http\Controllers\Student\CourseController::class, 'index'])->name('courses.index');
            Route::get('courses/{course}', [App\Http\Controllers\Student\CourseController::class, 'show'])->name('courses.show');
            Route::get('topics/{topic}', [App\Http\Controllers\Student\TopicController::class, 'show'])->name('topics.show');
        });

    // ─── SUPER ADMIN PANEL ───
    Route::middleware(['auth', 'verified', CheckRole::class.':admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
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
        Route::get('/tenants/{tenant}/users', [TenantUserController::class, 'index'])->name('tenants.users.index');
        Route::post('/tenants/{tenant}/users', [TenantUserController::class, 'store'])->name('tenants.users.store');
        Route::put('/tenants/{tenant}/users/{user}', [TenantUserController::class, 'update'])->name('tenants.users.update');
        Route::delete('/tenants/{tenant}/users/{user}', [TenantUserController::class, 'destroy'])->name('tenants.users.destroy');

        Route::resource('courses', CourseController::class);
        Route::resource('batches', BatchController::class)->except(['show']);
        Route::resource('enrollments', EnrollmentController::class)->except(['show']);
        Route::resource('chapters', ChapterController::class)->except(['show']);
        Route::resource('topics', TopicController::class)->except(['show']);
        Route::resource('instructors', \App\Http\Controllers\Admin\InstructorController::class)->except(['show']);
        Route::resource('class-sessions', ClassSessionController::class)->except(['show']);
        Route::resource('attendances', AttendanceController::class)->except(['show']);
        Route::resource('fee-structures', FeeStructureController::class)->except(['show']);
        Route::resource('installments', InstallmentController::class)->except(['show']);
        Route::resource('payments', PaymentController::class)->except(['show']);
        Route::resource('exams', ExamController::class)->except(['show']);
        Route::resource('results', ResultController::class)->except(['show']);
    });

    require __DIR__.'/settings.php';
});
