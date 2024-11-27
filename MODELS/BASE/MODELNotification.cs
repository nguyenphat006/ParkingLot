using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.BASE
{
    public class MODELNotification
    {
        public string NguoiNhan { get; set; }
        public string NguoiGui { get; set; }
        public string Action { get; set; } = "";
        public string Message { get; set; }
    }
}
