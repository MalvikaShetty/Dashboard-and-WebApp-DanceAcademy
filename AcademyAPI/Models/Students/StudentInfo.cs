using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.Models
{
    public class StudentInfo
    {
        [Key]
        public int StudentId { get; set; }
        public string StudentFullName { get; set; }
        public string StudEmail { get; set; }
        public string StudPassword { get; set; }
        public DateTime RegDate { get; set; }
        public string? Status { get; set; } //Active inactive
    }
}
