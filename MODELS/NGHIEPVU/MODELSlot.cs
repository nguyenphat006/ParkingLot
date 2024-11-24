using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODELS.NGHIEPVU
{
    public class MODELSlot: MODELBase
    {
        public Guid Id { get; set; }

        public Guid ParkingId { get; set; }

        public string? SlotCode { get; set; }    
        public string? Status { get; set; }
    }
}
