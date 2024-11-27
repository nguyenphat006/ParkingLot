using System;
using System.Collections.Generic;

namespace ParkingLot_Api.Entities;

public partial class Slot
{
    public Guid Id { get; set; }

    public Guid? ParkingId { get; set; }

    public string? SlotCode { get; set; }

    public string? Status { get; set; }

    public DateTime? CreateDate { get; set; }

    public string? CreateBy { get; set; }

    public DateTime? UpdateDate { get; set; }

    public string? UpdateBy { get; set; }

    public DateTime? DeleteDate { get; set; }

    public string? DeleteBy { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDeleted { get; set; }
}
