<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeeStructure extends Model
{
    use BelongsToTenant, HasFactory;

    protected $fillable = [
        'tenant_id',
        'course_id',
        'name',
        'total_amount',
        'installment_count',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
