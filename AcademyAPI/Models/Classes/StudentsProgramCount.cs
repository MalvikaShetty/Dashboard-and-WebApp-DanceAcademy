using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.Models
{
    public class StudentsProgramCount
    {
        [Key]
        public int StudentProgCountId { get; set; }
        public int ProgramId { get; set; }
        public int NoOfStudents { get; set; }

    }
}
