<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'project_id',
        'name',
        'description',
        'status',
        'assigned_to',
        'due_date',
    ];
    // Define the relationship to the project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Define the relationship to the assigned user (if applicable)
    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
