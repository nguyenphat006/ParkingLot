using Microsoft.AspNetCore.Mvc;

namespace ParkingLot_Fe.Controllers.Website
{
    public class WebsiteController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
