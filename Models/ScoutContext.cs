using Microsoft.EntityFrameworkCore;
using Scout.Models;

namespace Scout.Models
{
    public class ScoutContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasIndex(p => p.SKU)
                .IsUnique();
                
            modelBuilder.Entity<Order>()
                .HasIndex(o => o.OrderNumber)
                .IsUnique();
        }
        public ScoutContext(DbContextOptions<ScoutContext> options)
            : base(options)
        {
        }
        public DbSet<Scout.Models.Bin> Bin { get; set; }
        public DbSet<Scout.Models.Inventory> Inventory { get; set; }
        public DbSet<Scout.Models.Order> Order { get; set; }

        public DbSet<Scout.Models.OrderLine> OrderLine { get; set; }
        public DbSet<Scout.Models.Product> Product { get; set; }

        // public DbSet<TodoItem> TodoItems { get; set; }
    }
}