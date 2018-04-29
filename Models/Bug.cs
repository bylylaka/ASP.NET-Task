using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my_new_app.Models
{
    //public enum Statuss
    //{
    //    New, Opened, Solved, Closed
    //}

    //public enum Urgencys
    //{
    //    VeryUrgently, Urgently, DoNotRush, NotAtAllUrgently
    //}

    //public enum Criticalitys
    //{
    //    Emergency, Critical, Uncritical, ChangeRequest
    //}

    public class Bug
    {
        public int BugId { get; set; }
        public DateTime Date { get; set; }
        public string ShortDescr { get; set; }
        public string FullDescr { get; set; }
        //public status status { get; set; }
        //public urgency urgency { get; set; }
        //public criticality criticality { get; set; }

        public string Status { get; set; }
        public string Urgency { get; set; }
        public string Criticality { get; set; }

        public ICollection<History> Historys { get; set; }
    }
}
