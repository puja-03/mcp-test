<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Batch extends Model
{
    use BelongsToTenant, HasFactory, SoftDeletes;

    protected $fillable = [
        'tenant_id',
        'course_id',
        'name',
        'batch_code',
        'start_date',
        'end_date',
        'capacity',
        'enrolled_count',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function teachers()
    {
        return $this->belongsToMany(User::class, 'batch_teachers', 'batch_id', 'teacher_id')
            ->withPivot('is_primary', 'assigned_at');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}
