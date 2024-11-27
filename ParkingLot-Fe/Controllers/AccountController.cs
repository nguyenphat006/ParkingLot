using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MODELS.TAIKHOAN;

namespace ParkingLot_Fe.Controllers
{
    public class AccountController : Controller
    {
        //private readonly SignInManager<MODELNguoiDung> _SignInManager;
        //private readonly UserManager<MODELNguoiDung> _userManager;

        //public AccountController(SignInManager<MODELNguoiDung> SignInManager, UserManager<MODELNguoiDung> userManager)
        //{
        //    _SignInManager = SignInManager;
        //    _userManager = userManager;
        //}
        public IActionResult Login()
        {
            return View();
        }
        public IActionResult Register()
        {
            return View();
        }
        //[HttpPost]
        //public async Task<IActionResult> Register(MODELDangKy model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        MODELNguoiDung obj = new MODELNguoiDung
        //        {
        //            FullName = model.HoTen,
        //            Email = model.Email,
        //            UserName = model.Email
        //        };
        //        var result = await _userManager.CreateAsync(obj, model.MatKhau);
        //        if (result.Succeeded)
        //        {
        //            return RedirectToAction("Login", "Account");
        //        }
        //        else
        //        {
        //            foreach (var error in result.Errors)
        //            {
        //                ModelState.AddModelError("", error.Description);

        //            }
        //            return View(model);
        //        }
        //    }
        //    return View(model);
        //}
        public IActionResult VerifyEmail()
        {
            return View();
        }
        public IActionResult ChangePassword()
        {
            return View();
        }
    }
}
