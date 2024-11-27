using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.TAIKHOAN
{
    public class MODELNguoiDung: IdentityUser
    {
        public string FullName { get; set; }
    }
}
