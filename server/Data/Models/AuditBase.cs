using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public abstract class AuditBase
    {
        [Column(TypeName = "varchar(100)")]
        public string UpdatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}