<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectMember extends Model
{
    use HasFactory;
    protected $fillable = [
        'project_id',
        'user_id',
        'role',
        'start_date',
        'end_date',
    ];
    // Define the relationship to the project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Define the relationship to the user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
