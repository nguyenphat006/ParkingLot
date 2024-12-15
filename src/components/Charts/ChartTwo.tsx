import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";

const ChartTwo: React.FC = () => {
  const [parkingLotCount, setParkingLotCount] = useState<number[]>([]);
  const [totalSpaces, setTotalSpaces] = useState<number[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/ParkingLots')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK' && Array.isArray(data.results)) {
          const parkingLots = data.results;
          const count: number[] = [];
          const spaces: number[] = [];

          parkingLots.forEach((parking: any) => {
            count.push(parking.id);
            spaces.push(parking.total_spaces);
          });

          setParkingLotCount(count);
          setTotalSpaces(spaces);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => console.error('Error fetching parking data:', error));
  }, []);

  const series = [
    {
      name: "Số lượng bãi đậu xe",
      data: parkingLotCount,
    },
    {
      name: "Tổng số lượng chỗ",
      data: totalSpaces,
    },
  ];

  const options: ApexOptions = {
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },

    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",

      markers: {
        radius: 99,
        width: 16,
        height: 16,
        strokeWidth: 10,
        strokeColor: "transparent",
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Thống kê bãi đậu xe
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={["Tuần này", "Tuần trước"]} />
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-3.5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={370}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
