import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import IndexParkingLot from "@/components/ViewParkingLot/Index"
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const ParkingLot = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ParkingLot" />
      <div className="flex flex-col gap-10">
        <IndexParkingLot />
      </div>
    </DefaultLayout>
  );
};

export default ParkingLot;
