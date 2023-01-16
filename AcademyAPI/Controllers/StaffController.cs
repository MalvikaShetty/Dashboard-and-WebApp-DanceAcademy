using Microsoft.AspNetCore.Mvc;

namespace AcademyAPI.Controllers
{
    public class StaffController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
