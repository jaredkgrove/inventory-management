using System;
using System.Collections.Generic;

namespace Scout.Models
{
    public class OrderDto
    {
        public long OrderID { get; set; }
        public bool OrderFilled {get; set;}
        public string OrderNumber { get; set;}
        public DateTime DateOrdered {get; set;}
        public string CustomerName {get; set;}
        public string CustomerAddress { get; set; }
        public List<OrderLineDto> OrderLines {get; set;}        
    }
}