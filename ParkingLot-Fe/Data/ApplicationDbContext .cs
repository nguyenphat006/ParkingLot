using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace ParkingLot_Api.Endentity
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Nếu có các thực thể khác, bạn có thể khai báo ở đây
        // public DbSet<YourEntity> YourEntities { get; set; }
    }
}
