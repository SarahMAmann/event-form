using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Data.Models
{
    public class ApplicationRole : IdentityRole<int>
    {
        [Column(TypeName = "varchar(50)")]
        public string Description { get; set; }
    }
}