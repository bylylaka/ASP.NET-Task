using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my_new_app.Models
{
    public class History
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Action { get; set; }///тут список
        public string Comment { get; set; }
        public User User { get; set; }
    }
}
