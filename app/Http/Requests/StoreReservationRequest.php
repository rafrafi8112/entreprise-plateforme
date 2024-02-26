<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
            'name' => 'required|string|max:255',
            'google_calendar_event_id' => 'nullable|string',
            // Vous pouvez ajouter d'autres champs et règles de validation ici.
        ];
    }
}
