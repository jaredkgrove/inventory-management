using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Scout.Models;
using System.Collections.Generic;
using AutoMapper;

namespace Scout
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));
            services.AddDbContext<ScoutContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            // services.AddDbContext<ScoutContext>(opt => opt.UseInMemoryDatabase("ScoutDb"));
            services.AddControllers();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            // AddSeedData(app);
        }
        private static void AddSeedData(IApplicationBuilder app){
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ScoutContext>();
            
                var Slinky = new Product
                {
                    SKU = "SKU1",
                    ProductDescription = "Slinky"
                };

                var BeachBall = new Product
                {
                    SKU = "SKU2",
                    ProductDescription = "Beach Ball"
                };

                var Barbie = new Product
                {
                    SKU = "SKU3",
                    ProductDescription = "Barbie"
                };

                var bin1 = new Bin
                {
                    BinName = "Bin #1"
                };
                
                var bin2 = new Bin
                {
                    BinName = "Bin #2"
                };
                var bin3 = new Bin
                {
                    BinName = "Bin #3"
                };

                
                context.Product.Add(Slinky);
                context.Product.Add(BeachBall);
                context.Product.Add(Barbie);

                context.Bin.Add(bin1);
                context.Bin.Add(bin2);
                context.Bin.Add(bin3);

                context.SaveChanges();

                var inventory1 = new Inventory
                {
                    BinID = 1,
                    ProductID = 1,
                    QTY= 100
                };
                
                var inventory2 = new Inventory
                {
                    BinID = 1,
                    ProductID = 3,
                    QTY= 10
                };
                                
                var inventory3 = new Inventory
                {
                    BinID = 2,
                    ProductID = 1,
                    QTY= 50
                };
                                
                var inventory4 = new Inventory
                {
                    BinID = 3,
                    ProductID = 1,
                    QTY= 100
                };

                var inventory5 = new Inventory
                {
                    BinID = 3,
                    ProductID = 2,
                    QTY= 75
                };

                var inventory6 = new Inventory
                {
                    BinID = 3,
                    ProductID = 3,
                    QTY= 25
                };

                context.Inventory.Add(inventory1);
                context.Inventory.Add(inventory2);
                context.Inventory.Add(inventory3);
                context.Inventory.Add(inventory4);
                context.Inventory.Add(inventory5);
                context.Inventory.Add(inventory6);
                
                context.SaveChanges();

                var orderLine1 = new OrderLine
                {
                    OrderID = 1,
                    ProductID = 1,
                    QTY = 2,
                };

                var order1 = new Order
                {
                    OrderFilled = true,
                    CustomerName = "Jim",
                    CustomerAddress = "123 St"
                };
               order1.OrderLines = new List<OrderLine>();
               order1.OrderLines.Add(orderLine1);

               var orderLine2 = new OrderLine
                {
                    OrderID = 2,
                    ProductID = 1,
                    QTY = 2,
                };

               var orderLine3 = new OrderLine
                {
                    OrderID = 2,
                    ProductID = 3,
                    QTY = 4,
                };

                var order2 = new Order
                {
                    CustomerName = "Jim",
                    CustomerAddress = "123 St"
                };

            order2.OrderLines = new List<OrderLine>();
               order2.OrderLines.Add(orderLine2);
order2.OrderLines.Add(orderLine3);

                context.Order.Add(order1);
                context.Order.Add(order2);
                context.SaveChanges();
                
                // context.SaveChanges();
                // context.Order.Add(orderLine1);

            }   
        }     

    }
}
