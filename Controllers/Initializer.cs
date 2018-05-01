using System.Linq;
using my_new_app.Models;

namespace my_new_app.controllers
{
    public static class Initializer
    {
        public static void Initialize(ApplicationContext context)
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