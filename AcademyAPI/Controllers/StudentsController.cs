using Microsoft.AspNetCore.Mvc;

namespace AcademyAPI.Controllers
{
    public class StudentsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
