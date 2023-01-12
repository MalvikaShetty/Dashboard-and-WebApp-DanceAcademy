using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.Models
{
    public class StudentFees
    {
        [Key]
        public int StudFeesId { get; set; }
        public int StudentId { get; set; }
        public int FeesAmount { get; set; }
        public bool StudFeesPaid { get; set; }

    }
}
