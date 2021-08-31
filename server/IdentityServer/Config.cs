// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };
        }

        // If this doesn't work, use explicit object creation method below
        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new List<ApiScope>
            {
                new ApiScope("api1", "My API")
            };
        }


        //public static IEnumerable<ApiScope> GetApiScopes()
        //{
        //    return new[]
        //    {
        //        new ApiScope
        //        {
        //            Enabled = true,
        //            Name = "api1",
        //            DisplayName = "API V1",
        //            Description = "API V1",
        //            Required = false,
        //            Emphasize = false,
        //            ShowInDiscoveryDocument = true
        //        }
        //    };
        //}

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new[]
            {
                new ApiResource
                {
                    Name = "myApi",
                    DisplayName = "root api",
                    Scopes = new List<string> {"api1"}
                }
            };
        }


        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    // Think of ClientId and ClientSecret as login and password for application itself
                    ClientId = "wwc.starter.app",

                    RedirectUris =
                    {
                        "http://localhost/auth-callback"
                    },

                    RequirePkce = true,

                    PostLogoutRedirectUris =
                    {
                        "http://localhost"
                    },

                    RequireClientSecret = false,

                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.Code,

                    // Scopes client has access to
                    AllowedScopes = {
                        "openid",
                        "api1"
                    },

                    AllowAccessTokensViaBrowser = true,

                    AllowOfflineAccess = true,

                    AllowedCorsOrigins =
                    {
                        "http://localhost"
                    }
                }
            };
        }
    }
}
