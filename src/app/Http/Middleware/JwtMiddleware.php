<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
//        $token = $request->cookie('token');
//        if (!$token) {
//            Log::info("No token found in cookies");
//            return redirect('/gluecrypt/login');
//        }
//
//
//        try {
//            $key = config('app.jwt_key');
//            $decoded = JWT::decode($token, new Key($key, 'HS256'));
//            Log::info(json_encode($decoded));
//        } catch (Exception $e) {
//            Log::info("JWT decoding failed: " . $e->getMessage());
//            return redirect('/gluecrypt/login')->withoutCookie('token');
//        }
//
        return $next($request);
    }
}
