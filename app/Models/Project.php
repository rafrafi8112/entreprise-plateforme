<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'manager_id',
        'status',
        'start_date',
        'end_date',
    ];
       // Define the relationship to the manager
       public function manager()
       {
           return $this->belongsTo(User::class, 'manager_id');
       }
   
       // Define the relationship to project members
       public function members()
       {
           return $this->hasMany(ProjectMember::class);
       }
   
       // Define the relationship to tasks
       public function tasks()
       {
           return $this->hasMany(Task::class);
       }
}
