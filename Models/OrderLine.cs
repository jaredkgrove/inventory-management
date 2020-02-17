using System;
using System.ComponentModel.DataAnnotations;

namespace Scout.Models
{
    public class OrderLine
    {
        public long OrderLineID { get; set; }
        
        public long OrderID {get; set;}
        public Order Order { get; set;}
        public long ProductID { get; set; }
        public Product Product {get; set;}
        // public long FillBinID {get; set;}
        // public Bin FillBin {get; set;}
        [Range(0, int.MaxValue)]
        public int QTY {get; set;} 
    }
}