<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Course extends Model
{
    use BelongsToTenant, HasFactory, SoftDeletes;

    protected $fillable = [
        'tenant_id',
        'user_id',
        'name',
        'slug',
        'code',
        'description',
        'duration_months',
        'total_fees',
        'thumbnail_url',
        'is_active',
        'is_published',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_published' => 'boolean',
        'total_fees' => 'decimal:2',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Course $course) {
            if (empty($course->slug)) {
                $course->slug = Str::slug($course->name);
            }
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function batches(): HasMany
    {
        return $this->hasMany(Batch::class);
    }

    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class)->orderBy('order_index');
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function enrollments(): \Illuminate\Database\Eloquent\Relations\HasManyThrough
    {
        return $this->hasManyThrough(Enrollment::class, Batch::class);
    }
}
