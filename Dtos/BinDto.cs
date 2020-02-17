using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scout.Models
{
    public class BinDto
    {
        public long BinID { get; set; }
        public string BinName { get; set; }
        public List<InventoryDto> Inventories {get; set;}
    }
}