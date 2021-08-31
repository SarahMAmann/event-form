using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace AuthData
{
    public static class ConnectionStringProvider
    {
        private static string _connectionString;

        public static string GetConnectionString()
        {
            if (string.IsNullOrEmpty(_connectionString))
            {
                var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                if (string.IsNullOrEmpty(envName))
                {
                    var directory = Directory.GetParent(Directory.GetCurrentDirectory()).GetDirectories("IdentityServer")[0];
                    var connectionString = GetConnectionStringFromConfig(envName, directory.FullName);
                    _connectionString = connectionString.Replace("server=db;port=3306", "server=localhost;port=3307");
                }
                else
                {
                    _connectionString = GetConnectionStringFromConfig(envName, Directory.GetCurrentDirectory());
                }
            }

            return _connectionString;
        }

        private static string GetConnectionStringFromConfig(string environment, string directory)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                    .SetBasePath(directory)
                    .AddJsonFile($"appsettings.{environment ?? "Development"}.json")
                    .Build();

            return configuration.GetValue<string>("ConnectionString");
        }
    }
}
