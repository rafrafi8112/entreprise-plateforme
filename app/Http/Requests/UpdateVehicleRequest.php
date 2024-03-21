<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    { 
        return [
        'make' => 'required|string',
        'model' => 'required|string',
        'year' => 'required|integer',
        'registration_number' => 'required|string|unique:vehicles,registration_number,' . $this->vehicle->id,
        'fuel_card_number' => 'required|string',
        'insurance_payment_due_date' => 'required|date',
        'tax_payment_due_date' => 'required|date',
    ];
    }
}
