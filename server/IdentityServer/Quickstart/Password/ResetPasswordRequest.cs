using System;
using System.ComponentModel.DataAnnotations;

namespace IdentityServer.Quickstart.Password
{
    public class ResetPasswordRequest
    {
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
