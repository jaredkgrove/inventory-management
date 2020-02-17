using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Scout.Models
{
    public class Product
    {
        public long ProductID { get; set; }
        public string SKU { get; set; }
        public string ProductDescription {get; set;}
        public List<Inventory> Inventories {get;} = new List<Inventory>();
        public List<OrderLine> OrderLines {get;} = new List<OrderLine>();

        private int _totalInventory; 
        public int TotalInventory 
        {
            get {
                this.Inventories.ForEach(i => _totalInventory += i.QTY); 
                return _totalInventory; 
            }
        }
    }
}