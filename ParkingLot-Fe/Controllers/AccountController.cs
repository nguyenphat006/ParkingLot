using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MODELS.TAIKHOAN;
using System.Threading.Tasks;

namespace ParkingLot_Fe.Controllers
{
    public class AccountController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AccountController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        // GET: Login
        public IActionResult Login()
        {
            return View();
        }

        // POST: Login
        [HttpPost]
        public async Task<IActionResult> Login(MODELDangNhap model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(user, model.MatKhau, model.GhiNhoToi, lockoutOnFailure: false);
                    if (result.Succeeded)
                    {
                        return RedirectToAction("Index", "Admin");
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Mật khẩu không chính xác.");
                    }
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Không tìm thấy người dùng với email này.");
                }
            }
            return View(model);
        }

        // GET: Register
        public IActionResult Register()
        {
            return View(new MODELDangKy()); // Truyền một model mới để tránh null
        }

        // POST: Register
        [HttpPost]
        public async Task<IActionResult> Register(MODELDangKy model)
        {
            if (ModelState.IsValid)
            {
                // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
                if (model.PasswordHash != model.XacNhanMatKhau)
                {
                    ModelState.AddModelError(string.Empty, "Mật khẩu và xác nhận mật khẩu không khớp.");
                    return View(model); // Trả lại view nếu không khớp
                }

                var user = new IdentityUser
                {
                    UserName = model.Email,
                    Email = model.Email
                };

                var result = await _userManager.CreateAsync(user, model.PasswordHash);

                if (result.Succeeded)
                {
                    TempData["SuccessMessage"] = "Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.";
                    return RedirectToAction("Login", "Account");
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    ModelState.AddModelError(string.Empty, "Không thể lưu dữ liệu, vui lòng thử lại.");
                }
            }

            return View(model); // Trả về lại View nếu ModelState không hợp lệ
        }
    }
}
