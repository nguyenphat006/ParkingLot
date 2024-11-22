using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ParkingLot_Fe.Models
{
    public class ProductVM
    {
        public Guid Id { get; set; }
        [Required]
        [DisplayName("Tên sản phẩm")]
        public string? Name { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}
