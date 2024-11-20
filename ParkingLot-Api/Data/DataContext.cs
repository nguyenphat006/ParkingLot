using Microsoft.EntityFrameworkCore;
using ParkingLot_Api.Entities;

namespace ParkingLot_Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<SupperHero> SupperHeroDEMO{ get; set; }
    }
}
