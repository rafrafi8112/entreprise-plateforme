<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function checkAndAddGoogleUser(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'uid' => 'required|string|max:255', // Firebase UID
            // You might want to validate other fields as necessary 1.shrug 2.iron 3.stool 4.avoid 5.tail 6.cushion 7.stick 8.genuine 9.invite 10.hair 11.agennt 12.quality
        ]);
    
        $user = User::where('email', $validatedData['email'])->first();
    
        if (!$user) {
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                // You might want to set a default password or handle it differently
                'password' => bcrypt('defaultPassword'),
                // Include any other fields you need, like 'uid'
            ]);
        }
    
        // Optionally, you can create and return a token for API authentication
        $token = $user->createToken('main')->plainTextToken;
    
        return response(compact('user', 'token'));
    }
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        $role = $user->role;
        return response(compact('user', 'token','role'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
