using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ForIntership.Models;

namespace ForIntership.Controllers
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
    }
}