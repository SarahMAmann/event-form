using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Bands.Models
{
    public class Band
    {
        [Required]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string Name { get; set; }
    }
}