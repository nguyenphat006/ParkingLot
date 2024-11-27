using System;
using System.Collections.Generic;

namespace ParkingLot_Api.Entities;

public partial class SupperHeroDemo
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Power { get; set; }

    public string? City { get; set; }
}
