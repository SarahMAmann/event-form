using System.Threading.Tasks;
using RestSharp;

namespace IdentityServer.Services
{
    public interface IApiHttpService
    {
        T Execute<T>(IRestRequest request) where T : new();
        Task<T> ExecuteAsync<T>(IRestRequest request) where T : new();
    }
}