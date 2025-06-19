<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class Authenticate
{
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        if (Auth::guard()->guest()) {
            abort(401, 'Unauthenticated.');
        }

        return $next($request);
    }
}
