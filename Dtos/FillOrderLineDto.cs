using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Scout.Models
{
    public class FillOrderLineDto
    {
        public long InventoryID {get; set;}
        public long OrderLineID {get; set;}
        [Range(0, int.MaxValue)]
        public int QTY { get; set; }
    }
}
