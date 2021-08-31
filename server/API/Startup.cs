using System;
using System.IdentityModel.Tokens.Jwt;
using API.Middleware;
using API.Utilities;
using Data;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Serilog;

namespace API
{
    public class Startup
    {
        private const string AllowedOrigins = "_allowedOrigins";
        public IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _environment = environment;
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(AllowedOrigins,
                    builder =>
                    {
                        builder
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .WithOrigins(_configuration.GetSection("CorsOrigins").Get<string[]>())
                            .AllowCredentials();
                    });
            });

            services.AddDbContext<StarterContext>(options =>
                options.UseMySql(ConnectionStringProvider.GetConnectionString(),
                 dbOptions =>
                 {
                     dbOptions.EnableRetryOnFailure(
                         maxRetryCount: 5,
                         maxRetryDelay: TimeSpan.FromSeconds(5),
                         errorNumbersToAdd: null
                     );
                     dbOptions.ServerVersion(new Version(10, 4, 14),
                        Pomelo.EntityFrameworkCore.MySql.Infrastructure.ServerType.MariaDb);
                 }
                 ));

            services.AddControllers();

            services
                .AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                    .AddIdentityServerAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme, options =>
                    {
                        options.Authority = _configuration.GetSection("AuthServerBaseUrlDockerHost").Get<string>();
                        options.RequireHttpsMetadata = false;
                        options.Audience = "myApi";
                        options.TokenValidationParameters.ValidateAudience = true;
                        options.TokenValidationParameters.ValidIssuers = new[]
                        {
                            _configuration.GetValue<string>("AuthServerBaseUrlLocalhost"),
                            _configuration.GetValue<string>("AuthServerBaseUrlDockerHost")
                        };                        
                    },
                    null
                    );

            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiAccess", policy =>
                {
                    policy.RequireClaim("scope", "api1");
                    policy.RequireAuthenticatedUser();
                });
            });
            services.AddHttpContextAccessor();
            services.RegisterApplicationServices(_configuration);
            services.AddHealthChecks();

            services.AddMvc()
                .AddJsonOptions(options =>
                    options.JsonSerializerOptions.Converters.Add(new DateTimeConverter()));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Starter API", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment() || env.EnvironmentName == "develop")
            {
                app.UseDeveloperExceptionPage();

                app.UseSwagger();
                app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Starter Project API"); });
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseSerilogRequestLogging(opts =>
                 opts.GetLevel = LogHelper.GetCustomLevel
            );


            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(AllowedOrigins);
            app.UseAuthentication();
            app.UseAuthorization();
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/api/healthcheck");
            });
        }
    }
}
