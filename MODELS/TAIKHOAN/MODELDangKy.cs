using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.TAIKHOAN
{
    public class MODELDangKy
    {
        [Required(ErrorMessage = "Họ tên không được để trống")]
        public string HoTen { get; set; }
        [Required(ErrorMessage = "Email không được để trống")]
        [EmailAddress(ErrorMessage = "Email không đúng định dạng")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Mật khẩu không được để trống")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Mật khẩu phải có ít nhất {2} ký tự.")]
        [DataType(DataType.Password)]
        [Compare("XacNhanMatKhau", ErrorMessage = "Mật khẩu và xác nhận mật khẩu không khớp.")]
        public string MatKhau { get; set; }
        [Required(ErrorMessage = "Xác nhận mật khẩu không được để trống")]
        [DataType(DataType.Password)]
        [Display(Name = "Xác nhận mật khẩu")]
        public string XacNhanMatKhau { get; set; }
    }
}
