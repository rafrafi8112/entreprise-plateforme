<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'make',
        'model',
        'year',
        'registration_number',
        'fuel_card_number',
        'insurance_payment_due_date',
        'tax_payment_due_date',
    ];

    protected $casts = [
        'insurance_payment_due_date' => 'date',
        'tax_payment_due_date' => 'date',
    ];
}
