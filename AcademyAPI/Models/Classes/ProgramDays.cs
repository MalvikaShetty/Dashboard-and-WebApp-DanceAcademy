using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.Models.Classes
{
    public class ProgramDays
    {
        [Key]
        public int PDId { get; set; }
        public int ProgramId { get; set; }
        public string ProgramName { get; set; }
        public string Day { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

    }
}
