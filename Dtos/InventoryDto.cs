using System.Text.Json.Serialization;

namespace Scout.Models
{
    public class InventoryDto
    {
        public long InventoryID { get; set; }
        public long ProductID {get; set;}
        public string ProductDescription {get; set;}
        public Product Product { set{this.ProductDescription = value.ProductDescription;} }
        public long BinID {get; set;}
        public Bin Bin {set {this.BinName = value.BinName;}}
        public string BinName {get; set;}
        public int QTY {get; set;}
    }
}