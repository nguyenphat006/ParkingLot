using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.NGHIEPVU
{
    public class MODELParking: MODELBase
    {
        public Guid Id { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Mã không được để trống")]
        public string? ParkingCode { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên bãi đậu không được để trống")]
        public string? Name { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Mã zip không được để trống")]
        public int? ZipCode { get; set; }

        public string? Image { get; set; }

        public decimal? Latitude { get; set; }

        public decimal? Longitude { get; set; }
        public string? Ward{ get; set; }

        public string? Address { get; set; }

        public string? District { get; set; }

        public string? Province { get; set; }

        public int? TotalSlots { get; set; }

        public string? Description { get; set; }

        public DateTime? OpenTime { get; set; }

        public DateTime? CloseTime { get; set; }

        public string? OpenTimeFormatted => OpenTime?.ToString("hh:mm tt");
        public string? CloseTimeFormatted => CloseTime?.ToString("hh:mm tt");

    }

    public class MODELParkingValidator : AbstractValidator<MODELParking>
    {
        public MODELParkingValidator()
        {
            RuleFor(x => x.ParkingCode).NotEmpty().WithMessage("Mã không được để trống");
            RuleFor(x => x.Name).NotEmpty().WithMessage("Tên bãi đậu không được để trống");
            RuleFor(x => x.ZipCode).NotEmpty().WithMessage("Mã zip không được để trống");
        }
    }
}
