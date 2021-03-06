using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Scout.Models
{
    public class Inventory
    {
        public long InventoryID { get; set; }
        public long ProductID {get; set;}
        public Product Product { get; set; }
        public long BinID {get; set;}
        public Bin Bin {get; set;}
        [Range(0, int.MaxValue)]
        public int QTY {get; set;}

        public void FillOrderLine(OrderLine orderLine){
            this.QTY -= orderLine.QTY;
        }
    }
}