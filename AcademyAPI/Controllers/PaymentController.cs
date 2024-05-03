using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace AcademyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        [HttpPost("create-payment-intent")]
        public ActionResult CreatePaymentIntent([FromBody] PaymentRequest request)
        {
            var paymentIntentService = new PaymentIntentService();
            var paymentIntent = paymentIntentService.Create(new PaymentIntentCreateOptions
            {
                Amount = CalculateAmount(request.Amount),
                Currency = "usd",
                PaymentMethodTypes = new List<string> { "card" },
                Description = $"Payment for student {request.StudentId}",
            });

            return Ok(new { ClientSecret = paymentIntent.ClientSecret });
        }

        private long CalculateAmount(decimal amount)
        {
            // Stripe expects amounts in cents, so convert dollars to cents
            return (long)(amount * 100);
        }
    }

    public class PaymentRequest
    {
        public decimal Amount { get; set; }
        public string StudentId { get; set; }
    }
}
