<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(Request $request)
    {
        $code = $request->input('code');
        if (!$code) {
            return response()->json(['error' => 'Authentication failed', 'message' => 'Missing required parameter: code'], 400);
        }

        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            // Your existing user handling logic here...
        } catch (\Exception $e) {
            // Return the exception details for debugging
            return response()->json(['error' => 'Authentication failed', 'message' => $e->getMessage()], 401);
        }

        // Return a successful response or redirect...
    }
}
