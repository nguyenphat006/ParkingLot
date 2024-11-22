using Microsoft.EntityFrameworkCore;
using ParkingLot_Api.Model;

namespace ParkingLot_Api.Entities
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }

    }
}
