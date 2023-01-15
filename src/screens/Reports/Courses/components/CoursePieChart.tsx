import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const CoursePieChart = ({
  series,
  width = 500,
}: {
  series: number[];
  width?: string | number | undefined;
}) => {
  const [chartData, setChartData] = useState<ApexOptions>({
    chart: {
      width: 380,
      type: "pie",
    },
    labels: [
      " ثبت نام قطعی",
      " عدم تایید مالی",
      " بلاتکلیف",
      " انصراف و اخراج",
    ],
    legend: {
      fontFamily: "inherit",
      labels: {
        colors: "#777",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  useEffect(() => {
    setChartData({
      ...chartData,
      labels: [
        ` ثبت نام قطعی ${series[0]}`,
        ` عدم پرداخت کامل ${series[1]}`,
        ` پرداخت نشده ${series[2]}`,
        ` انصراف و اخراج ${series[3]}`,
        ` بلاتکلیف ${series[4]}`,
      ],
    });
  }, [series]);
  return (
    <ReactApexChart
      options={chartData}
      series={series}
      type="pie"
      width={width}
    />
  );
};

export default CoursePieChart;
