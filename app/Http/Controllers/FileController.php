<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function show($filename)
{
    $path = 'uploads/image/' . $filename; // The 'public' disk is set to storage/app/public, so we start from there

    if (!Storage::disk('public')->exists($path)) {
        abort(404);
    }

    $file = Storage::disk('public')->get($path);
    $type = Storage::disk('public')->mimeType($path);

    $response = response($file, 200)->header("Content-Type", $type);

    return $response;
}
}