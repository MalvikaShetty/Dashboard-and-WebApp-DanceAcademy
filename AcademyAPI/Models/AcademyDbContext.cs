using AcademyAPI.Models.Classes;
using Microsoft.EntityFrameworkCore;

namespace AcademyAPI.Models
{
    public class AcademyDbContext : DbContext
    {
        public AcademyDbContext(DbContextOptions<AcademyDbContext> options) : base(options)
        {

        }
        public DbSet<StyleInfo> styleinfo { get; set; }
        public DbSet<Programs> programs { get; set; }
        public DbSet<ProgramDays> progdays { get; set; }
        public DbSet<StudentsProgramCount> studprogcount { get; set; }
        public DbSet<StudentInfo> studinfo { get; set; }
        public DbSet<StudentClass> studclass { get; set; }
        public DbSet<StudentFees> studfees { get; set; }
        public DbSet<InstructorInfo> instinfo { get; set; }
        public DbSet<StaffInfo> staffinfo { get; set; }
    }
}
