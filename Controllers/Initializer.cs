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
                Name = "Admin",
                Surname = "Admin",
                Password = "123"
            }
            );

            context.Statuss.AddRange(
            new Status
            {
                Name = "New"
            },
            new Status
            {
                Name = "Opened"
            },
            new Status
            {
                Name = "Solved"
            },
            new Status
            {
                Name = "Closed"
            }
            );
        
            context.Urgencys.AddRange(
            new Urgency
            {
                Name = "Very urgently"
            },
            new Urgency
            {
                Name = "Urgently"
            },
            new Urgency
            {
                Name = "Do not rush"
            },
            new Urgency
            {
                Name = "not at all urgently"
            }
            );


            context.Criticalitys.AddRange(
            new Criticality
            {
                Name = "Emergency"
            },
            new Criticality
            {
                Name = "Critical"
            },
            new Criticality
            {
                Name = "Uncritical"
            },
            new Criticality
            {
                Name = "Change request"
            }
            );

            context.UserActions.AddRange(
            new UserAction
            {
                Name = "Enter"
            },
            new UserAction
            {
                Name = "Open"
            },
            new UserAction
            {
                Name = "Solve"
            },
            new UserAction
            {
                Name = "Close"
            }
            );

            context.SaveChanges();
        }
    }
}