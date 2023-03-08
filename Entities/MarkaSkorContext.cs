using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MarkaSkor.Entities;

public partial class MarkaSkorContext : DbContext
{
    public MarkaSkorContext()
    {
    }

    public MarkaSkorContext(DbContextOptions<MarkaSkorContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<BrandReview> BrandReviews { get; set; }

    public virtual DbSet<Brand__Category> Brand__Categories { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Sector> Sectors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=MarkaSkor;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Account__3213E83FAB95B458");

            entity.ToTable("Account");

            entity.HasIndex(e => e.username, "UQ__Account__F3DBC572E974C323").IsUnique();

            entity.Property(e => e.email).HasMaxLength(320);
            entity.Property(e => e.externalId)
                .HasMaxLength(64)
                .IsUnicode(false);
            entity.Property(e => e.externalType)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasDefaultValueSql("('native')");
            entity.Property(e => e.pw).HasMaxLength(250);
            entity.Property(e => e.username).HasMaxLength(60);
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Brand__3213E83F2ACDDC53");

            entity.ToTable("Brand");

            entity.HasIndex(e => e.brandName, "UQ__Brand__95238E9F76AF6664").IsUnique();

            entity.Property(e => e.brandDesc)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.brandName)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.icon)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.logo)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<BrandReview>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__BrandRev__3213E83FD8A881C3");

            entity.ToTable("BrandReview");

            entity.Property(e => e.comment)
                .HasMaxLength(1000)
                .IsUnicode(false);

            entity.HasOne(d => d.account).WithMany(p => p.BrandReviews)
                .HasForeignKey(d => d.accountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Review__Account");

            entity.HasOne(d => d.brand).WithMany(p => p.BrandReviews)
                .HasForeignKey(d => d.brandId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Review__Brand");
        });

        modelBuilder.Entity<Brand__Category>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Brand__C__3213E83F66C09255");

            entity.ToTable("Brand__Category");

            entity.HasOne(d => d.brand).WithMany(p => p.Brand__Categories)
                .HasForeignKey(d => d.brandId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Brand__Category__Brand");

            entity.HasOne(d => d.category).WithMany(p => p.Brand__Categories)
                .HasForeignKey(d => d.categoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Brand__Category__Category");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Category__3213E83FE30E51F7");

            entity.ToTable("Category");

            entity.Property(e => e.id).ValueGeneratedNever();
            entity.Property(e => e.cateName)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.sector).WithMany(p => p.Categories)
                .HasForeignKey(d => d.sectorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Category__Sector");
        });

        modelBuilder.Entity<Sector>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Sector__3213E83F41B9246E");

            entity.ToTable("Sector");

            entity.HasIndex(e => e.sectorName, "UQ__Sector__0B422822CBBF644B").IsUnique();

            entity.Property(e => e.id).ValueGeneratedNever();
            entity.Property(e => e.img)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.sectorName)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
