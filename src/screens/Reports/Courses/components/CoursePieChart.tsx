import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

const CoursePieChart = ({ series }: { series: number[] }) => {
  const chartData: ApexOptions = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: [" ثبت نام قطعی", " عدم تایید مالی", " بلاتکلیف", " انصراف و اخراج"],
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
  };
  return (
    <ReactApexChart
      options={chartData}
      series={series}
      type="pie"
      width={500}
    />
  );
};

export default CoursePieChart;
