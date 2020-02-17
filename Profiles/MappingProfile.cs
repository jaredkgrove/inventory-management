// using AutoMapper;

// namespace Scout.Models
// {
//     public class OrderProfile : Profile
//     {
//         public OrderProfile()
//         {
//             CreateMap<Order, OrderDto>();
//             // Use CreateMap... Etc.. here (Profile methods are the same as configuration methods)
//         }
//     }
// }
using AutoMapper;
// using Scout.Dtos;
// using Vidly.Models;

namespace Scout.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to Dto
            CreateMap<Order, OrderDto>();
            CreateMap<OrderLine, OrderLineDto>();
            CreateMap<Inventory, InventoryDto>();
            CreateMap<Bin, BinDto>();
            CreateMap<Product, ProductDto>();
            // Dto to Domain
            // Mapper.CreateMap<CustomerDto, Customer>()
            //     .ForMember(c => c.Id, opt => opt.Ignore());

            // Mapper.CreateMap<MovieDto, Movie>()
            //     .ForMember(c => c.Id, opt => opt.Ignore());
        }
    }
}