using System.Linq;
using my_new_app.Models;
using Microsoft.EntityFrameworkCore;

namespace my_new_app.controllers
{
    public static class Initializer
    {
        public static void Initialize(ApplicationContext context)
        {
            if (context.Users.Count() == 0)
            {
                context.Users.AddRange(
                new User
                {
                    Login = "Admin",
                    Name = "Admin",
                    Surname = "Admin",
                    Password = "123"
                }
                );

                context.SaveChanges();
            }
        }
    }
}