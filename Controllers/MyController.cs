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
        public IEnumerable<Bug> Get()
        {
            return db.Bugs.ToList();
        }

        [Authorize]
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
            history.UserId = 1;
            history.Date = DateTime.Now;
            history.UserAction = Status;
            history.Comment = Comment;
            db.Historys.Add(history);

            Bug bug = db.Bugs
               .Where(b => b.BugId.Equals(id))
               .ToList()[0];
            bug.Status = Status;

            db.SaveChanges();
            return Ok(history);
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



















        [HttpPost("Login")]
        public async Task<IActionResult> Login(string Login, string Password)
        {
            if (ModelState.IsValid)
            {
                User user = await db.Users.FirstOrDefaultAsync(u => u.Login == Login && u.Password == Password);
                if (user != null)
                {
                    await Authenticate(Login); // аутентификация

                    return RedirectToAction("Index", "/");
                }
                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }
            return RedirectToAction("Index", "xyeva");
        }

        //[HttpPost("SignIn")]
        //public async Task<IActionResult> Register(string Login, string Name, string Surname, string Password)
        //{
        //    User user = await db.Users.FirstOrDefaultAsync(u => u.Login == Login);
        //    if (user == null)
        //    {
        //        // добавляем пользователя в бд
        //        db.Users.Add(new User { Login = Login, Name = Name, Surname = Surname, Password = Password });
        //        await db.SaveChangesAsync();

        //        await Authenticate(Login); // аутентификация

        //        return RedirectToAction("Index", "/");
        //    }
        //    else
        //        ModelState.AddModelError("", "User with this login already exist");

        //    return RedirectToAction("Index", "xyeva");
        //}

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

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account");
        }







        [HttpGet("api/IsAuthenticated")]
        public Boolean Test()
        {
            return User.Identity.IsAuthenticated;
        }
    }
}