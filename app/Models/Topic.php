<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Topic extends Model
{
    use BelongsToTenant, HasFactory;

    protected $fillable = [
        'tenant_id',
        'chapters_id',
        'topic_title',
        'topic_slug',
        'content',
        'video_url',
        'order_index',
        'is_completed',
        'attachments',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'attachments' => 'array',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Topic $topic) {
            if (empty($topic->topic_slug)) {
                $topic->topic_slug = Str::slug($topic->topic_title);
            }
        });
    }

    public function getRouteKeyName(): string
    {
        return 'topic_slug';
    }

    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class, 'chapters_id');
    }
}
