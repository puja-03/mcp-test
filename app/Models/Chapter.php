<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Chapter extends Model
{
    use BelongsToTenant, HasFactory;

    protected $fillable = [
        'tenant_id',
        'course_id',
        'user_id',
        'chapter_title',
        'chapter_slug',
        'order_index',
        'is_completed',
        'attachments',
    ];

    protected $casts = [
        'order_index' => 'integer',
        'is_completed' => 'boolean',
        'attachments' => 'array',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Chapter $chapter) {
            if (empty($chapter->chapter_slug)) {
                $chapter->chapter_slug = Str::slug($chapter->chapter_title);
            }
        });
    }

    public function getRouteKeyName(): string
    {
        return 'chapter_slug';
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function topics(): HasMany
    {
        return $this->hasMany(Topic::class, 'chapters_id')->orderBy('order_index');
    }
}
