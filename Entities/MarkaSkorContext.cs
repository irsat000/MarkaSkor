﻿using System;
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

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<Brand__Category> Brand__Categories { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Sector> Sectors { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserActivation> UserActivations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=MarkaSkor;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Brand__3213E83F172A0FE0");

            entity.ToTable("Brand");

            entity.HasIndex(e => e.brandKey, "UQ__Brand__941A5E2E160A2282").IsUnique();

            entity.Property(e => e.brandKey).HasMaxLength(255);
            entity.Property(e => e.brandName).HasMaxLength(255);
            entity.Property(e => e.icon).HasMaxLength(255);
            entity.Property(e => e.logo).HasMaxLength(255);
        });

        modelBuilder.Entity<Brand__Category>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Brand__C__3213E83F5C9922CC");

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
            entity.HasKey(e => e.id).HasName("PK__Category__3213E83FEE0C2BBB");

            entity.ToTable("Category");

            entity.HasIndex(e => e.cateKey, "UQ__Category__3FFC0760491E31EC").IsUnique();

            entity.Property(e => e.cateKey).HasMaxLength(255);
            entity.Property(e => e.cateName).HasMaxLength(255);
            entity.Property(e => e.icon).HasMaxLength(255);

            entity.HasOne(d => d.sector).WithMany(p => p.Categories)
                .HasForeignKey(d => d.sectorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Category__Sector");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Review__3213E83F7FB97C35");

            entity.ToTable("Review");

            entity.Property(e => e.comment)
                .HasMaxLength(1000)
                .IsUnicode(false);

            entity.HasOne(d => d.brand).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.brandId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Review__Brand");

            entity.HasOne(d => d.user).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.userId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Review__Users");
        });

        modelBuilder.Entity<Sector>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Sector__3213E83F9175EBBB");

            entity.ToTable("Sector");

            entity.HasIndex(e => e.sectorKey, "UQ__Sector__7489AEDDDF2CDC01").IsUnique();

            entity.Property(e => e.id).ValueGeneratedNever();
            entity.Property(e => e.sectorKey).HasMaxLength(255);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Users__3213E83F2A0A554B");

            entity.Property(e => e.email).HasMaxLength(255);
            entity.Property(e => e.fullname).HasMaxLength(255);
            entity.Property(e => e.password).HasMaxLength(255);
            entity.Property(e => e.phoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.username).HasMaxLength(255);
        });

        modelBuilder.Entity<UserActivation>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__UserActi__3213E83FDD541B0B");

            entity.ToTable("UserActivation");

            entity.Property(e => e.activationCode)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.creationDate).HasColumnType("datetime");
            entity.Property(e => e.expirationDate).HasColumnType("datetime");
            entity.Property(e => e.phoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
