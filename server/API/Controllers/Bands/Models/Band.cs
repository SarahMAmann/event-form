using System;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers.Bands.Models
{
    public class Band
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
