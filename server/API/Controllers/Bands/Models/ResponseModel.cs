using System;
namespace API.Controllers.Bands.Models
{
    public class ResponseModel
    {
        public bool Success { get; set; }
        public bool Error { get; set; }
        public string Message { get; set; }
    }
}
