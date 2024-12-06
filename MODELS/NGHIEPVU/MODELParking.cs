using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.NGHIEPVU
{
    public class MODELParking : MODELBase
    {
        public Guid Id { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Mã không được để trống")]
        public string? ParkingCode { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên bãi đậu không được để trống")]
        public string? Name { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Mã zip không được để trống")]
        public int? ZipCode { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Ảnh không được để trống")]
        public string? Image { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Vĩ độ không được để trống")]
        public decimal? Latitude { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Kinh độ không được để trống")]
        public decimal? Longitude { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Phường/Xã không được để trống")]
        public string? Ward { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Địa chỉ không được để trống")]
        public string? Address { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Quận/Huyện không được để trống")]
        public string? District { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tỉnh/Thành không được để trống")]
        public string? Province { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Số lượng không được để trống")]
        public int? TotalSlots { get; set; }
        public string? Description { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Thời gian mở cửa chưa chọn")]
        public DateTime? OpenTime { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Thời gian đóng cửa chưa chọn")]
        public DateTime? CloseTime { get; set; }

        //public string? OpenTimeFormatted => OpenTime?.ToString("hh:mm tt");
        //public string? CloseTimeFormatted => CloseTime?.ToString("hh:mm tt");

        public string? OpenTimeFormatted
        {
            get => OpenTime?.ToString("HH:mm tt");
            set
            {
                if (DateTime.TryParse(value, out var time))
                {
                    OpenTime = DateTime.Today.Add(time.TimeOfDay);
                }
            }
        }

        public string? CloseTimeFormatted
        {
            get => CloseTime?.ToString("HH:mm tt");
            set
            {
                if (DateTime.TryParse(value, out var time))
                {
                    CloseTime = DateTime.Today.Add(time.TimeOfDay);
                }
            }
        }

    }

    public class MODELParkingValidator : AbstractValidator<MODELParking>
    {
        public MODELParkingValidator()
        {
            RuleFor(x => x.ParkingCode).NotEmpty().WithMessage("Mã không được để trống");
            RuleFor(x => x.Name).NotEmpty().WithMessage("Tên bãi đậu không được để trống");
            RuleFor(x => x.ZipCode).NotEmpty().WithMessage("Mã zip không được để trống");
            RuleFor(x => x.Image).NotEmpty().WithMessage("Hình ảnh chưa chọn");
            RuleFor(x => x.Latitude).NotEmpty().WithMessage("Chưa chọn vĩ độ");
            RuleFor(x => x.Longitude).NotEmpty().WithMessage("Chưa chọn kinh độ");
            RuleFor(x => x.Ward).NotEmpty().WithMessage("Chưa chọn Phường/Xã");
            RuleFor(x => x.Address).NotEmpty().WithMessage("Chưa chọn địa chỉ");
            RuleFor(x => x.District).NotEmpty().WithMessage("Chưa chọn Quận/Huyện");
            RuleFor(x => x.Province).NotEmpty().WithMessage("Chưa chọn Tỉnh/Thành");
            RuleFor(x => x.TotalSlots).NotEmpty().WithMessage("Chưa thêm số lượng");
            RuleFor(x => x.OpenTime).NotEmpty().WithMessage("Chưa chọn giờ mở cửa");
            RuleFor(x => x.CloseTime).NotEmpty().WithMessage("Chưa chọn giờ đóng cửa");

        }
    }
}
