using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcademyAPI.Models.Classes
{
    public class Programs
    {
        [Key]
        public int ProgramId { get; set; }
        public int StyleId { get; set; }
        public string ProgramName { get; set; }
        public int InstId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Fees { get; set; }
        public string Status { get; set; } //Active inactive
    }
}
