<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'make' => $this->make,
            'model' => $this->model,
            'year' => $this->year,
            'registration_number' => $this->registration_number,
            'fuel_card_number' => $this->fuel_card_number,
            'insurance_payment_due_date' => $this->insurance_payment_due_date ? $this->insurance_payment_due_date->format('Y-m-d') : null,
            'tax_payment_due_date' => $this->tax_payment_due_date ? $this->tax_payment_due_date->format('Y-m-d') : null,
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,
        ];
    }
}
