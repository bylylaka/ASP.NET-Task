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

        [Route("api/getUser")]
        [HttpGet]
        public IEnumerable<User> GetUser(int id)
        {
            IEnumerable<User> list = db.Users.ToList();
            var Maxim = from a in list
                        where a.Id == id
                        select a;
            return Maxim;
        }
    }
}