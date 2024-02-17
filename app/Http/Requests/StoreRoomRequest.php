<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // Retournez true pour permettre à tous les utilisateurs de faire cette demande
        // ou implémentez votre logique d'autorisation spécifique.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'description' => 'required|string|max:255',
            'available' => 'boolean',
            // Ajoutez d'autres règles de validation selon vos besoins
        ];
    }
}