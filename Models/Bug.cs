using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my_new_app.Models
{
    public class Bug
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string ShortDescr { get; set; }
        public string FullDescr { get; set; }
        public User User { get; set; }
        public Status Status { get; set; }
        public Urgency Urgency { get; set; }
        public Criticality Criticality { get; set; }
        public List<History> histories { get; set; }
    }
}
