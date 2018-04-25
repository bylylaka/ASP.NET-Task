using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ForIntership.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Bug> Bugs { get; set; }
        public DbSet<Criticality> Criticalitys { get; set; }
        public DbSet<History> Historys { get; set; }
        public DbSet<Status> Statuss { get; set; }
        public DbSet<Urgency> Urgencys { get; set; }
        public DbSet<User> Users { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        { }
    }
}
