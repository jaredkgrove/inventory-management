using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scout.Models
{
    public class FillOrderLineDto
    {
        public long InventoryID {get; set;}
        public long OrderLineID {get; set;}
        public int QTY { get; set; }
    }
}
