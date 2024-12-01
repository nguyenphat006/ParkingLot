using System;
using System.Collections.Generic;

namespace ParkingLot_Api.Entities;

public partial class Parking
{
    public Guid Id { get; set; }

    public string? ParkingCode { get; set; }

    public string? Name { get; set; }

    public int? ZipCode { get; set; }

    public string? Image { get; set; }

    public decimal? Latitude { get; set; }

    public decimal? Longitude { get; set; }

    public string? Address { get; set; }

    public string? Ward { get; set; }

    public string? District { get; set; }

    public string? Province { get; set; }

    public int? TotalSlots { get; set; }

    public string? Description { get; set; }

    public DateTime? OpenTime { get; set; }

    public DateTime? CloseTime { get; set; }

    public DateTime? CreateDate { get; set; }

    public string? CreateBy { get; set; }

    public DateTime? UpdateDate { get; set; }

    public string? UpdateBy { get; set; }

    public DateTime? DeleteDate { get; set; }

    public string? DeleteBy { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDeleted { get; set; }
}
