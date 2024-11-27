namespace MODELS
{
    public class MODELBase
    {
        public DateTime? CreateDate { get; set; }
        public string? CreateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? UpdateBy { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set;}
        public bool IsEdit { get; set; } = false;
        public int? Sort { get; set; }
    }
}
