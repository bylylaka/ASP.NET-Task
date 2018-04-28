using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace my_new_app.Models
{
    public class Urgency
    {
        [Key]
        public string Name { get; set; }
    }
}
