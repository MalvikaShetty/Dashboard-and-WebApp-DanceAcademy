using System;

namespace AcademyAPI.Models.Financials
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public int StudentId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentIntentId { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
