<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
        'project_id' => $this->project_id,
        'name' => $this->name,
        'description' => $this->description,
        'status' => $this->status,
        'assigned_to' => $this->assigned_to, // This is the ID of the assigned user
        'due_date' => $this->due_date,
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
        // Corrected to use 'assignedTo' to match the relationship method name in the Task model
        'assignedTo' => new UserResource($this->whenLoaded('assignedTo')),
        'project' => new ProjectResource($this->whenLoaded('project')),
        ];
    }
}
