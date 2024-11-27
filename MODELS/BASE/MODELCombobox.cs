using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.BASE
{
    public class MODELCombobox
    {
        public string? Text { get; set; } = string.Empty;
        public string? Value { get; set; } = string.Empty;
        public int? Sort { get; set; }
        public string? Parent { get; set; }
        public bool IsSelected { get; set; } = false;
    }
}
