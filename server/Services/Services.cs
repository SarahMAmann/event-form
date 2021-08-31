using Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Services.Bands;

namespace Services
{
    public static class Services
    {
        public static void RegisterServiceLayerServices(this IServiceCollection services, IConfiguration configuration)
        {
            //Transient Services – unique instance per injection
            // * Expensive to create (relative)
            // * Multiple instances won't interfere with each other
            // * Stateless by nature

            //Scoped Services – unique instance per request (an HTTP request, in the context of a Web API)
            // *               ==> DATA_CONTEXT (ENTITY FRAMEWORK) MUST BE HERE <==
            // *             ==> SERVICE THAT DEPEND ON DATA_CONTEXT MUST BE HERE <==
            // * Will hold state throughout the request - that's the main value (but don't abuse it!)
            services.AddScoped<IBandsService, BandsService>();

            //Singleton Services – unique instance per application
            // * Cheap to create (relative)
            // * Only one instance, ever
            // * Should be stateless (unless you have a really good reason, like caching - otherwise use the DB/DS for state)

            services.RegisterDataLayerServices();
        }
    }
}
