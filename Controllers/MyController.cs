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

        [Route("api/getBugs")]
        [HttpGet]
        public IEnumerable<Bug> Get()
        {
            return db.Bugs.ToList();
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

        [HttpGet("api/getBug/{id}")]
        public Bug GetBug(int id)
        {
            Bug bug = db.Bugs.FirstOrDefault(x => x.BugId == id);
            return bug;
        }






        [HttpPost("api/cgangeBug/{id}")]
        public IActionResult CgangeBug(int id, string Comment, string Status)
        {
            History history = new History();
            history.BugId = id;
            history.UserId = 1;
            history.Date = DateTime.Now;
            history.UserAction = Status;
            history.Comment = Comment;
            db.Historys.Add(history);

            db.SaveChanges();
            return Ok(history);
        }






        [HttpGet("api/getHistoty/{id}")]
        public IEnumerable<History> GetHistory(int id)
        {
            var history = db.Historys
               .Where(b => b.BugId.Equals(id))
               .ToList();

            return history;
        }
    }
}