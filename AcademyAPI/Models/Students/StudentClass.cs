using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.Models
{
    public class StudentClass
    {
        [Key]
        public int StudentClId { get; set; }
        public int StudentId { get; set; }
        public int ProgramId { get; set; }
    }
}
