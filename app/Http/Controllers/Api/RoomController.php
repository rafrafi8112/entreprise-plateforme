<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use ErlandMuchasaj\LaravelFileUploader\FileUploader;
class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rooms = Room::all();
        return RoomResource::class::collection($rooms);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreRoomRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRoomRequest $request)
    {
        $room = Room::create($request->validated());

        return response(new RoomResource($room) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function show(Room $room)
    {
        return new RoomResource($room);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRoomRequest  $request
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRoomRequest $request, Room $room)
    {
        $room->update($request->validated());
        return new RoomResource($room);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function destroy(Room $room)
    {
        $room->delete();
        return response()->json(null, 204);
    }
    public function upload(Request $request)
    {
        $max_size = (int) ini_get('upload_max_filesize') * 1000;

        $extensions = implode(',', FileUploader::images());

        $request->validate([
            'file' => [
                'required',
                'file',
                'image',
                'mimes:' . $extensions,
                'max:' . $max_size,
            ],
        ]);

        $file = $request->file('file');

        $response = FileUploader::store($file);

        return redirect()
                ->back()
                ->with('success', 'File has been uploaded.')
                ->with('file', $response);
    }
}