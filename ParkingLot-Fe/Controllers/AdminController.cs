using Microsoft.AspNetCore.Mvc;

namespace ParkingLot_Fe.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            // Sử dụng layout dành riêng cho Admin
            ViewBag.Layout = "~/Views/Shared/_LayoutAdminDB.cshtml";
            return View();
        }
    }
}
