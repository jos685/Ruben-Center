<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'gender',
        'age',
        'assigned_office',
        'has_paid',
        'payment_method',
        'status',
    ];
}
