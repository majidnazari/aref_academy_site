import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ConsultantPieChart = ({
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
      "کل ساعات حضور",
      "کل ساعات غیبت",
      "کل ساعات ترخیص زودتر",
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
        ` جمع ساعات حضور ${series[0]}`,
        ` جمع ساعات  غیبت  ${series[1]}`,
        `  جمع ساعات ترخیص زودتر${series[2]}`,
        
      ],
    });
  }, [series]);
  return (
    //<></>
    // @ts-ignore
    <ReactApexChart 
       options={chartData}
       series={series}
       type="pie"
       width={width}
       height={250}
    />
  );
};

export default ConsultantPieChart;
