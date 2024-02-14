<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
       /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
       // Check if the user is authenticated and is an admin
       if (auth()->check() && auth()->user()->role === 'admin') {
        return $next($request);
    }

    // For API routes, return a JSON response indicating unauthorized access
    if ($request->expectsJson()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // For web routes, redirect non-admin users to the dashboard
    return redirect('/dashboard');
    }
}
