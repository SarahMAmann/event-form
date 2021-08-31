using System;
using Microsoft.AspNetCore.Http;
using Serilog.Events;

namespace API.Middleware
{
    public static class LogHelper
    {
        public static LogEventLevel GetCustomLevel(HttpContext ctx, double _, Exception ex)
        {
            if (ex != null || ctx.Response.StatusCode > 499)
            {
                return LogEventLevel.Error;
            }

            if (IsHealthCheckEndpoint(ctx))
            {
                return LogEventLevel.Verbose;
            }

            return LogEventLevel.Information;
        }

        private static bool IsHealthCheckEndpoint(HttpContext ctx)
        {
            var endpoint = ctx.GetEndpoint();
            if (endpoint is object) // same as !(endpoint is null)
            {
                return string.Equals(
                    endpoint.DisplayName,
                    "Health checks",
                    StringComparison.Ordinal);
            }

            return false;
        }
    }
}