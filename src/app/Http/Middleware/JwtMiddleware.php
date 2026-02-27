<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->cookie('token');
        if (!$token) {
            return redirect('/gluecrypt/login');
        }


        try {
            $key = config('app.jwt_key');
            $decoded = JWT::decode($token, $key);



        } catch (Exception $e) {
            $request->cookie->forget('token');
            return redirect('/login');
        }

        return $next($request);
    }
}
