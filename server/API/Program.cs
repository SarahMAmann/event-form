using System;
using System.IO;
using Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using Services;

namespace API
{
    public class Program
    {
        private const string _development = "Development";

        public static IConfiguration Configuration { get; } = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? _development}.json", optional: true)
            .AddEnvironmentVariables()
            .Build();

        public static void Main(string[] args)
        {
            ConfigureLogger();

            var host = CreateWebHostBuilder(args).Build();

            try
            {
                using (var scope = host.Services.CreateScope())
                {
                    var services = scope.ServiceProvider;
                    var hostingEnvironment = services.GetService<IWebHostEnvironment>();
                    //var userSeedService = services.GetRequiredService<IUserSeedService>();
                    //if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != _development)
                    //{
                    //    var dbContext = services.GetService<StarterContext>();
                    //    dbContext.Database.Migrate();
                    //}

                    //if (!hostingEnvironment.IsProduction())
                    //{
                    //    userSeedService.LoadUsers().Wait();
                    //}
                }

                host.Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseSerilog();

        private static void ConfigureLogger()
        {
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();
        }
    }
}
