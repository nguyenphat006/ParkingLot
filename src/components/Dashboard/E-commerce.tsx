"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";

const ECommerce: React.FC = () => {
  return (
    <>
      <DataStatsOne />
      <div className="row-span-4 grid grid-cols-12 gap-4 mt-4 md:mt-6 2xl:mt-9 mb-4 md:mb-6 2xl:mb-9">
        <div className="col-span-12 xl:col-span-12">
          <MapOne />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default ECommerce;
