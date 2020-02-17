using System;
using System.Collections.Generic;

namespace Scout.Models
{
    public class Order
    {
        public long OrderID { get; set; }
        public bool OrderFilled {get; set;}
        public string OrderNumber { get; set;}
        
        public DateTime DateOrdered {get; set;}
        public string CustomerName {get; set;}
        public string CustomerAddress { get; set; }
        public List<OrderLine> OrderLines {get; set;}
        public Order()
        {          
            this.OrderNumber = Guid.NewGuid().ToString();
            this.DateOrdered  = DateTime.UtcNow;
            this.OrderFilled = false;
        }    
    }
}