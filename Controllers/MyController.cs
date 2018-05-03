using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using my_new_app.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;


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

        [Authorize]
        [Route("api/getBugs")]
        [HttpGet]
        public IEnumerable<Bug> GetBugs()
        {
            return db.Bugs.ToList();
        }

        [Authorize]
        [Route("api/newBug")]
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

            History history = new History();
            history.BugId = bug.BugId;

            var user = db.Users
               .Where(b => b.Login.Equals(User.Identity.Name))
               .ToList()[0];

            history.UserId = user.UserId;
            history.Date = bug.Date;
            history.UserAction = "Enter";
            history.Comment = "";
            db.Historys.Add(history);

            db.SaveChanges();

            return RedirectToAction("", "/bugList");
        }

        [Authorize]
        [HttpGet("api/getBug/{id}")]
        public Bug GetBug(int id)
        {
            Bug bug = db.Bugs.FirstOrDefault(x => x.BugId == id);
            return bug;
        }

        [Authorize]
        [HttpPost("api/cgangeBug/{id}")]
        public IActionResult CgangeBug(int id, string Comment, string Status)
        {
            History history = new History();
            history.BugId = id;

            var user = db.Users
               .Where(b => b.Login.Equals(User.Identity.Name))
               .ToList()[0];
            history.UserId = user.UserId;

            history.Date = DateTime.Now;
            history.UserAction = Status;
            history.Comment = Comment;
            db.Historys.Add(history);

            Bug bug = db.Bugs
               .Where(b => b.BugId.Equals(id))
               .ToList()[0];
            bug.Status = Status;

            db.SaveChanges();
            return RedirectToAction("", "/bugList");
        }

        [Authorize]
        [HttpGet("api/getHistoty/{id}")]
        public IEnumerable<History> GetHistory(int id)
        {
            var history = db.Historys
               .Where(b => b.BugId.Equals(id))
               .ToList();

            return history;
        }



        [Authorize]
        [HttpGet("api/profile")]
        public User GetProfile()
        {
            var user = db.Users
               .Where(b => b.Login.Equals(User.Identity.Name))
               .ToList();

            return user[0];
        }

        [Authorize]
        [Route("api/getUsers")]
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return db.Users
                .Select(c => new User { UserId = c.UserId, Name = c.Name, Surname = c.Surname})
                .ToList();
        }

        [HttpPost("api/newUser")]
        public String AddUser(string Login, string Name, string Surname, string Password)
        {
            var users = db.Users.FirstOrDefault(u => u.Login == Login);
            if (users == null)
            {
                db.Users.Add(new User { Login = Login, Name = Name, Surname = Surname, Password = Password });
                db.SaveChanges();
                return "User was successfully added!";
            }
            return "User with that Login exist already!";
        }

        [HttpPost("api/editProfile")]
        public String EditProfile(string Name, string Surname)
        {
            var user = db.Users
              .Where(b => b.Login.Equals(User.Identity.Name))
              .ToList()[0];

            user.Name = Name;
            user.Surname = Surname;
            db.SaveChanges();
            return "Success";
        }


















        [HttpPost("Login")]
        public async Task<String> Login(string Login, string Password)
        {
            if (ModelState.IsValid)
            {
                User user = await db.Users.FirstOrDefaultAsync(u => u.Login == Login && u.Password == Password);
                if (user != null)
                {
                    await Authenticate(Login); // аутентификация

                    return "OK";
                }
            }
            return "Incorrect login/password";
        }

        private async Task Authenticate(string Login)
        {
            // создаем один claim
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, Login)
            };
            // создаем объект ClaimsIdentity
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            // установка аутентификационных куки
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [HttpGet("api/LogOut")]
        public async Task<String> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return "";
        }







        [HttpGet("api/IsAuthenticated")]
        public Boolean Test()
        {
            return User.Identity.IsAuthenticated;
        }
    }
}