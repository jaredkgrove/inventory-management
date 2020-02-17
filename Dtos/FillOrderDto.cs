using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scout.Models
{
    public class FillOrderDto
    {
        public long OrderID {get; set;}
        public List<FillOrderLineDto> FillOrderLines { get; set; }

    }
}
