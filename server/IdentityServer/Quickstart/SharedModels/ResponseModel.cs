using System;
namespace IdentityServer.Quickstart.SharedModels
{
    public class ResponseModel
    {
        public bool Success { get; set; }
        public bool Error { get; set; }
        public string Message { get; set; }
    }
}
