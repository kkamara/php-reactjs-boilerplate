<?php

namespace App\Http\Middleware\V1;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Config;
use DateTimeZone;
use Exception;

class SetUserTimezone
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->hasHeader("Time-Zone")) {
            try {
                $timezoneId = $request->header("Time-Zone");
                // This will throw an exception if the
                // timezone header is invalid. And the
                // config value will remain unset.
                // Empty string also throws error.
                new DateTimeZone($timezoneId);
                Config::set(
                    "app.client_timezone",
                    $request->header("Time-Zone"),
                );
            } catch (Exception $e) {
                Log::info("Invalid timezone provided in request header: " . $request->header("timezone"));
            }
        }
        return $next($request);
    }
}
