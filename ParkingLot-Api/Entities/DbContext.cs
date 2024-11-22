using Microsoft.EntityFrameworkCore;
using ParkingLot_Api.Model;

namespace ParkingLot_Api.Entities
{
    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbContext(DbContextOptions<DbContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }

    }
}
