using System.ComponentModel.DataAnnotations;

namespace ParkingLot_Api.Model
{
    public class MODELProduct
    {
        public Guid Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}
