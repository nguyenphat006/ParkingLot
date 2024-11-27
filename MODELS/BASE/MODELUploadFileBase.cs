using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.BASE
{
    public class MODELUploadFileBase
    {
        public double FileSizeLimit { get; set; } //Megabyte
        public bool MultiFile { get; set; }
        public string FileValidateText { get; set; }
        public string[] FileValidate { get; set; }
        public List<MODELTepDinhKem> ListTepDinhKem { get; set; } //Tệp đính kèm hiện có
        public int RefType { get; set; }
        public Guid? RandomIdKey { get; set; }
        public string? FolderUpload { get; set; }
        public bool IsView { get; set; } = false;
    }
}
