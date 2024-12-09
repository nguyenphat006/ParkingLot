export type ParkingLot = {
    name?: string | null;
    description?: string | null;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    contactPhone?: string | null;
    contactEmail?: string | null;
    website?: string | null;
    baseHourlyRate?: number | null;
    is24Hours?: boolean | null;
    openTime?: string | null;
    closeTime?: string | null;
    slotTypes?: {
      Car?: number | null;
      Motorbike?: number | null;
      Bicycle?: number | null;
    } | null;
    pricesByVehicleType?: {
      Car?: number | null;
      Motorbike?: number | null;
      Bicycle?: number | null;
    } | null;
    hasCamera?: boolean | null;
    hasRoof?: boolean | null;
    hasOvernightParking?: boolean | null;
    hasDisabledAccess?: boolean | null;
    hasWashing?: boolean | null;
    hasMaintenance?: boolean | null;
    images?: string[] | null;
  };