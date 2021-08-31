using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Data.Models
{
    public class ApplicationUser : IdentityUser<int>
    {
        [Column(TypeName = "varchar(100)")]
        public string FirstName { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string LastName { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string AuthTokenExpirationKey { get; set; }

        [Column(TypeName = "varchar(250)")]
        public string PasswordResetToken { get; set; }
    }
}