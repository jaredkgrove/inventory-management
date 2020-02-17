using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scout.Models
{
    public class Bin
    {
        public long BinID { get; set; }
        public string BinName { get; set; }
        public List<Inventory> Inventories {get;} = new List<Inventory>();

    }
}