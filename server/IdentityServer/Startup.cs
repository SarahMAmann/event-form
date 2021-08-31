// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using AuthData;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using AuthData.Models;
using Microsoft.AspNetCore.Identity;
using System.Reflection;
using IdentityServer4.EntityFramework.DbContexts;
using System.Linq;
using IdentityServer4.EntityFramework.Mappers;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.HttpOverrides;
using IdentityServer.Services;

namespace IdentityServer
{
    public class Startup
    {
        private const string AllowedOrigins = "_allowedOrigins";
        private readonly IConfiguration _config;
        public IWebHostEnvironment Environment { get; }

        public Startup(IWebHostEnvironment environment, IConfiguration config)
        {
            _config = config;
            Environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // uncomment, if you want to add an MVC-based UI
            services.AddControllersWithViews();

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                options.RequireHeaderSymmetry = false;
                options.KnownNetworks.Clear();
                options.KnownProxies.Clear();
            });

            services.AddCors(options =>
            {
                options.AddPolicy(AllowedOrigins,
                    builder =>
                    {
                        builder
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .WithOrigins(_config.GetSection("CorsOrigins").Get<string[]>());
                    });
            });

            services.AddDbContext<AuthData.DbContext>(options =>
                options.UseMySql(ConnectionStringProvider.GetConnectionString(),
                dbOptions =>
                    {
                        dbOptions.EnableRetryOnFailure();
                    }
                ));

            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.SignIn.RequireConfirmedEmail = false;
                options.User.RequireUniqueEmail = true;

            })
            .AddEntityFrameworkStores<AuthData.DbContext>()
            .AddDefaultTokenProviders();

            //services.Configure<IdentityOptions>(options =>
            //{
            //    // Password settings.
            //    options.Password.RequireDigit = true;
            //    options.Password.RequireLowercase = true;
            //    options.Password.RequireNonAlphanumeric = true;
            //    options.Password.RequireUppercase = true;
            //    options.Password.RequiredLength = 6;
            //    options.Password.RequiredUniqueChars = 1;

            //    // Lockout settings.
            //    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            //    options.Lockout.MaxFailedAccessAttempts = 5;
            //    options.Lockout.AllowedForNewUsers = true;

            //    // User settings.
            //    options.User.AllowedUserNameCharacters =
            //    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
            //    options.User.RequireUniqueEmail = false;
            //});

            //services.ConfigureApplicationCookie(options =>
            //{
            //    // Cookie settings
            //    options.Cookie.HttpOnly = true;
            //    options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

            //    options.LoginPath = "/Identity/Account/Login";
            //    options.AccessDeniedPath = "/Identity/Account/AccessDenied";
            //    options.SlidingExpiration = true;
            //});

            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            services
                .AddIdentityServer()
                // not recommended for production - you need to store your key material somewhere secure
                .AddDeveloperSigningCredential()
                .AddAspNetIdentity<ApplicationUser>()
               .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = b =>
                        b.UseMySql(ConnectionStringProvider.GetConnectionString(),
                        mySql => mySql.MigrationsAssembly(migrationsAssembly)
                    );
                })
                 .AddOperationalStore(options =>
                 {
                     options.ConfigureDbContext = builder =>
                         builder.UseMySql(ConnectionStringProvider.GetConnectionString(),
                             mySql => mySql.MigrationsAssembly(migrationsAssembly)
                         );

                     // this enables automatic token cleanup. this is optional.
                     options.EnableTokenCleanup = true;
                     options.TokenCleanupInterval = 30;
                 });

            services.AddSingleton<IApiHttpService, ApiHttpService>();
        }

        public void Configure(IApplicationBuilder app)
        {
            // TODO: Something
            InitializeDatabase(app);

            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseForwardedHeaders();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors(AllowedOrigins);
            app.UseIdentityServer();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute()
                .RequireCors(AllowedOrigins);
            });
        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();

                var context = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
                context.Database.Migrate();
                if (!context.Clients.Any())
                {
                    foreach (var client in Config.GetClients())
                    {
                        context.Clients.Add(client.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (!context.IdentityResources.Any())
                {
                    foreach (var resource in Config.GetIdentityResources())
                    {
                        context.IdentityResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (!context.ApiResources.Any())
                {
                    foreach (var resource in Config.GetApiResources())
                    {
                        context.ApiResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (!context.ApiScopes.Any())
                {
                    foreach (var scope in Config.GetApiScopes())
                    {
                        context.ApiScopes.Add(scope.ToEntity());
                    }
                    context.SaveChanges();
                }
            }
        }
    }
}
