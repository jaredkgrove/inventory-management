using System;
using System.ComponentModel.DataAnnotations;

namespace Scout.Models
{
    public class OrderLineDto
    {
        public long OrderLineID { get; set; }
        public long ProductID { get; set; }
        public Product Product {
            set{
                this.ProductDescription = value.ProductDescription;
                this.SKU = value.SKU;
            }
        }
        public string ProductDescription {get; set;}
        public string SKU {get; set;}
        // public long FillBinID {get; set;}
        [Range(0, int.MaxValue)]
        public int QTY {get; set;}
    }
}