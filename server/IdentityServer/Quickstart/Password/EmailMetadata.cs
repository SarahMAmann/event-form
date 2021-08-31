using System;
namespace IdentityServer.Quickstart.Password
{
    public class EmailMetadata
    {
        public string ResetToken { get; set; }
        public string RecipientEmail { get; set; }
    }
}
