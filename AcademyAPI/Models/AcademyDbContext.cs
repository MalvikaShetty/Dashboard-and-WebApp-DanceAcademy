using AcademyAPI.Models.Classes;
using AcademyAPI.Models.Financials;
using AcademyAPI.Models.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AcademyAPI.Models
{
    public class AcademyDbContext : DbContext
    {
        public AcademyDbContext(DbContextOptions<AcademyDbContext> options) : base(options)
        {

        }
        public DbSet<User> users { get; set; }
        public DbSet<StyleInfo> styleinfo { get; set; }
        public DbSet<Programs> programs { get; set; }
        public DbSet<ProgramDays> progdays { get; set; }
        public DbSet<StudentsProgramCount> studprogcount { get; set; }
        public DbSet<StudentInfo> studinfo { get; set; }
        public DbSet<StudentClass> studclass { get; set; }
        public DbSet<StudentFees> studfees { get; set; }
        public DbSet<InstructorInfo> instinfo { get; set; }
        public DbSet<StaffInfo> staffinfo { get; set; }
        public DbSet<Payment> payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the Payment entity
            modelBuilder.Entity<Payment>(entity =>
            {
                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
                // Alternatively, use HasPrecision method:
                // entity.Property(e => e.Amount).HasPrecision(18, 2);
            });

            // Add any additional model configurations here
        }

    }
}
