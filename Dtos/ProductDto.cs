using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scout.Models
{
    public class ProductDto
    {
        public long ProductID { get; set; }
        public string SKU { get; set; }
        public string ProductDescription {get; set;}
        public List<InventoryDto> Inventories {get; set;}
        public List<OrderLineDto> OrderLines {get; set;}
        public int TotalInventory {get; set;}

    }
}