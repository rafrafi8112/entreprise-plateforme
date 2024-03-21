<?php

namespace App\Http\Controllers\Api;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\Resources\VehicleResource;
use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Http\Controllers\Controller;
class VehicleController extends Controller
{
    public function index()
{
    $vehicles = Vehicle::all();
    return VehicleResource::collection($vehicles);
}
    
    public function store(StoreVehicleRequest $request)
    { 
        $vehicle = Vehicle::create($request->all());
        return response()->json($vehicle, 201);
    }
    public function show(Vehicle $vehicle)
    {
        return new VehicleResource($vehicle);

    }
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        $vehicle->update($request->all());
        return response()->json($vehicle, 200);
    }
    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return response("", 204);
    }
       
}
