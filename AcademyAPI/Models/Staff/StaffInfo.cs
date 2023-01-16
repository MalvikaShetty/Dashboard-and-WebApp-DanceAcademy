using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.Models
{
    public class StaffInfo
    {
        [Key]
        public int StaffId { get; set; }
        public string StaffFullName { get; set; }
        public string StaffRole { get; set; } 
        public DateTime StaffContractFrom { get; set; }
        public DateTime StaffContractTo { get; set; }
        public string Status { get; set; } //Active inactive
    }
}
