namespace AcademyAPI.Models
{
    public class InstructorInfo
    {
        public int InstId { get; set; }
        public string InstFullName { get; set; }
        public string InstStyle { get; set; }
        public string InstType { get; set; } //Permenant or freelance
        public DateTime ContractFrom { get; set; }
        public DateTime ContractTo { get; set; }
    }
}
