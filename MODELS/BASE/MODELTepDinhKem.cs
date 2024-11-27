using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.BASE
{
    public class MODELTepDinhKem
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public int RefType { get; set; }
        public Guid LienKetId { get; set; }
        public string TenFile { get; set; }
        public string TenMoRong { get; set; }
        public double? DoLon { get; set; }
        public string Url { get; set; }
        public string TenTapTinFull { get; set; }
    }
}
