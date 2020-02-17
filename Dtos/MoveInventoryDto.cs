using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Scout.Models
{
    public class MoveInventoryDto
    {
        public long SourceInventoryID {get; set;}
        public long DestinationBinID {get; set;}
        public long ProductID {get; set;}
        [Range(0, int.MaxValue)]
        public int QTY { get; set; }
    }
}
