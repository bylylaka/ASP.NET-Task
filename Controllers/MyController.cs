using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using my_new_app.Models;

namespace my_new_app.controllers
{
    [Produces("application/json")]
    public class MyController : Controller
    {
        ApplicationContext db;
        public MyController(ApplicationContext context)
        {
            db = context;
        }

        [Route("api/My/Gi")]
        [HttpGet]
        public String Gi()
        {
            return "It's time to show - who is boss here!";
        }

        [Route("api/getUsers")]
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return db.Users.ToList();
        }

        [Route("/newBug")]
        [HttpPost]
        public IActionResult newBug(string ShortDescr, string FullDescr, string Urgency, string Criticality)
        {
            Bug bug = new Bug();

            bug.Date = DateTime.Now;
            bug.ShortDescr = ShortDescr;
            bug.FullDescr = FullDescr;

            bug.Status = "New";
            bug.Urgency = Urgency;
            bug.Criticality = Criticality;

            db.Bugs.Add(bug);





            History history = new History();        //Тут подумай как добавить
            history.BugId = bug.BugId;
            history.UserId = 1;
            history.Date = bug.Date;
            history.UserAction = "Enter";
            history.Comment = "";
            db.Historys.Add(history);

            db.SaveChanges();
            return Ok(bug);
        }
    }
}