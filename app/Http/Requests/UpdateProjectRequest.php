<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    public function authorize()
    {
        // Implement your authorization logic here.
        // For example, check if the user is the project manager or has permission to update the project.
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'manager_id' => 'sometimes|required|exists:users,id',
            'status' => 'sometimes|required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ];
    }
}
