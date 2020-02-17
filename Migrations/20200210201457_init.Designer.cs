﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Scout.Models;

namespace Scout.Migrations
{
    [DbContext(typeof(ScoutContext))]
    [Migration("20200210201457_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Scout.Models.Bin", b =>
                {
                    b.Property<long>("BinID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BinName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("BinID");

                    b.ToTable("Bin");
                });

            modelBuilder.Entity("Scout.Models.Inventory", b =>
                {
                    b.Property<long>("InventoryID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("BinID")
                        .HasColumnType("bigint");

                    b.Property<long>("ProductID")
                        .HasColumnType("bigint");

                    b.Property<int>("QTY")
                        .HasColumnType("int");

                    b.HasKey("InventoryID");

                    b.HasIndex("BinID");

                    b.HasIndex("ProductID");

                    b.ToTable("Inventory");
                });

            modelBuilder.Entity("Scout.Models.Order", b =>
                {
                    b.Property<long>("OrderID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CustomerAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOrdered")
                        .HasColumnType("datetime2");

                    b.Property<bool>("OrderFilled")
                        .HasColumnType("bit");

                    b.Property<string>("OrderNumber")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("OrderID");

                    b.HasIndex("OrderNumber")
                        .IsUnique()
                        .HasFilter("[OrderNumber] IS NOT NULL");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("Scout.Models.OrderLine", b =>
                {
                    b.Property<long>("OrderLineID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("FillBinID")
                        .HasColumnType("bigint");

                    b.Property<long>("OrderID")
                        .HasColumnType("bigint");

                    b.Property<long>("ProductID")
                        .HasColumnType("bigint");

                    b.Property<int>("QTY")
                        .HasColumnType("int");

                    b.HasKey("OrderLineID");

                    b.HasIndex("OrderID");

                    b.HasIndex("ProductID");

                    b.ToTable("OrderLine");
                });

            modelBuilder.Entity("Scout.Models.Product", b =>
                {
                    b.Property<long>("ProductID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ProductDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SKU")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("ProductID");

                    b.HasIndex("SKU")
                        .IsUnique()
                        .HasFilter("[SKU] IS NOT NULL");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("Scout.Models.Inventory", b =>
                {
                    b.HasOne("Scout.Models.Bin", "Bin")
                        .WithMany("Inventories")
                        .HasForeignKey("BinID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Scout.Models.Product", "Product")
                        .WithMany("Inventories")
                        .HasForeignKey("ProductID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Scout.Models.OrderLine", b =>
                {
                    b.HasOne("Scout.Models.Order", "Order")
                        .WithMany("OrderLines")
                        .HasForeignKey("OrderID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Scout.Models.Product", "Product")
                        .WithMany("OrderLines")
                        .HasForeignKey("ProductID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
