<?php

namespace App\Http\Controllers\Api;
use App\Models\Reservation;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Http\Resources\ReservationResource;

use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        return ReservationResource::class::collection(Reservation::with(['user', 'room'])->get());
    }

    public function store(StoreReservationRequest $request)
    {
        $data = $request->validated();
        $reservation = Reservation::create($data);

        return response(new ReservationResource($reservation), 201);
    }

    public function show(Reservation $reservation)
    {
        return new ReservationResource($reservation);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRoomRequest  $request
     * @param  \App\Models\Room  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {$reservation->update($request->validated());


        return new ReservationResource($reservation);
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return response("", 204);
    }
    public function getReservationById($id)
    {
        try {
            $reservation = Reservation::findOrFail($id);
            return response()->json($reservation);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Reservation not found'], 404);
        }
    }
}
