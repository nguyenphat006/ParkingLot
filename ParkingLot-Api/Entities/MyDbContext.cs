using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ParkingLot_Api.Entities;

public partial class MyDbContext : DbContext
{
    public MyDbContext()
    {
    }

    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }

    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

    public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

    public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }

    public virtual DbSet<Parking> Parkings { get; set; }

    public virtual DbSet<ParkingSlot> ParkingSlots { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Slot> Slots { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=ERICSS;Initial Catalog=ParkingLot;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AspNetRole>(entity =>
        {
            entity.HasIndex(e => e.NormalizedName, "RoleNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedName] IS NOT NULL)");

            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.NormalizedName).HasMaxLength(256);
        });

        modelBuilder.Entity<AspNetRoleClaim>(entity =>
        {
            entity.HasIndex(e => e.RoleId, "IX_AspNetRoleClaims_RoleId");

            entity.HasOne(d => d.Role).WithMany(p => p.AspNetRoleClaims).HasForeignKey(d => d.RoleId);
        });

        modelBuilder.Entity<AspNetUser>(entity =>
        {
            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedUserName] IS NOT NULL)");

            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.UserName).HasMaxLength(256);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "AspNetUserRole",
                    r => r.HasOne<AspNetRole>().WithMany().HasForeignKey("RoleId"),
                    l => l.HasOne<AspNetUser>().WithMany().HasForeignKey("UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId");
                        j.ToTable("AspNetUserRoles");
                        j.HasIndex(new[] { "RoleId" }, "IX_AspNetUserRoles_RoleId");
                    });
        });

        modelBuilder.Entity<AspNetUserClaim>(entity =>
        {
            entity.HasIndex(e => e.UserId, "IX_AspNetUserClaims_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserClaims).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserLogin>(entity =>
        {
            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

            entity.HasIndex(e => e.UserId, "IX_AspNetUserLogins_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserLogins).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserToken>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserTokens).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<Parking>(entity =>
        {
            entity.ToTable("Parking");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.CreateBy).HasMaxLength(256);
            entity.Property(e => e.CreateDate).HasColumnType("datetime");
            entity.Property(e => e.DeleteBy).HasMaxLength(256);
            entity.Property(e => e.DeleteDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.District).HasMaxLength(120);
            entity.Property(e => e.Image).IsUnicode(false);
            entity.Property(e => e.Latitude).HasColumnType("decimal(18, 8)");
            entity.Property(e => e.Longitude).HasColumnType("decimal(11, 8)");
            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.ParkingCode)
                .HasMaxLength(256)
                .IsUnicode(false);
            entity.Property(e => e.Province).HasMaxLength(120);
            entity.Property(e => e.UpdateBy).HasMaxLength(256);
            entity.Property(e => e.UpdateDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<ParkingSlot>(entity =>
        {
            entity.ToTable("ParkingSlot");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreateBy).HasMaxLength(256);
            entity.Property(e => e.CreateDate).HasColumnType("datetime");
            entity.Property(e => e.DeleteBy).HasMaxLength(256);
            entity.Property(e => e.DeleteDate).HasColumnType("datetime");
            entity.Property(e => e.UpdateBy).HasMaxLength(256);
            entity.Property(e => e.UpdateDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<Slot>(entity =>
        {
            entity.ToTable("Slot");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreateBy).HasMaxLength(256);
            entity.Property(e => e.CreateDate).HasColumnType("datetime");
            entity.Property(e => e.DeleteBy).HasMaxLength(256);
            entity.Property(e => e.DeleteDate).HasColumnType("datetime");
            entity.Property(e => e.SlotCode)
                .HasMaxLength(256)
                .IsUnicode(false);
            entity.Property(e => e.Status).HasMaxLength(120);
            entity.Property(e => e.UpdateBy).HasMaxLength(256);
            entity.Property(e => e.UpdateDate).HasColumnType("datetime");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
