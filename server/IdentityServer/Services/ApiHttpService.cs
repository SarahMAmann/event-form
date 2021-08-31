using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using RestSharp;

namespace IdentityServer.Services
{
    public class ApiHttpService : IApiHttpService
    {
        private readonly IConfiguration _config;

        readonly IRestClient _client;

        public ApiHttpService(IConfiguration config)
        {
            _config = config;
            _client = new RestClient(_config.GetValue<string>("InternalApiBaseUrl"));
        }

        public T Execute<T>(IRestRequest request) where T : new()
        {
            IRestResponse<T> response = _client.Execute<T>(request);

            if (response.ErrorException != null)
            {
                const string message = "Error retrieving response.  Check inner details for more info.";
                Exception httpException = new Exception(message, response.ErrorException);
                throw httpException;
            }
            return response.Data;
        }

        public async Task<T> ExecuteAsync<T>(IRestRequest request) where T : new()
        {
            IRestResponse<T> response = await _client.ExecuteAsync<T>(request);

            if (response.ErrorException != null)
            {
                const string message = "Error retrieving response.  Check inner details for more info.";
                Exception httpException = new Exception(message, response.ErrorException);
                throw httpException;
            }
            return response.Data;
        }
    }
}
