using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.Models
{
    public class InstructorInfo
    {
        [Key]
        public int InstId { get; set; }
        public string InstFullName { get; set; }
        public int StyleId { get; set; }
        public string InstType { get; set; } //Permenant or freelance
        public DateTime InstContractFrom { get; set; }
        public DateTime InstContractTo { get; set; }
        public string Status { get; set; } //Active inactive
    }
}
