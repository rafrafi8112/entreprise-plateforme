<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{ public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'room_id' => $this->room_id,
            'name'=>$this->name,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'google_calendar_event_id' => $this->google_calendar_event_id,
            'user' => new UserResource($this->whenLoaded('user')),
            'room' => new RoomResource($this->whenLoaded('room')),
        ];
    }
}
