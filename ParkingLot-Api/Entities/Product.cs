using System;
using System.Collections.Generic;

namespace ParkingLot_Api.Entities;

public partial class Product
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public double Price { get; set; }

    public int Quantity { get; set; }
}
