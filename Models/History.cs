using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my_new_app.Models
{
    public class History
    {
        public int HistoryId { get; set; }
        public int BugId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public string UserAction { get; set; }
        public string Comment { get; set; }
        
        public Bug Bug { get; set; }
        public User User { get; set; }
    }
}
