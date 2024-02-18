import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const ConsultantPieChart_2 = ({ series, width = 500 }: { series?: number[]; width?: string | number | undefined }) => {
  const [chartData, setChartData] = useState<ApexOptions>({
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['کل دانش آموزان تایید مالی', 'کل دانش آموزان بدهکار', 'کل دانش آموزان عدم پرداخت کامل'],
    legend: {
      fontFamily: 'inherit',
      labels: {
        colors: '#777',
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
            position: 'bottom',
          },
        },
      },
    ],
  })
  useEffect(() => {
    setChartData({
      ...chartData,
      labels: [
        ` کل دانش آموزان تایید مالی ${series ? series[0] : null}`,
        `  کل دانش آموزان بدهکار  ${series ? series[1] : null}`,
        `  کل دانش آموزان عدم پرداخت کامل  ${series ? series[2] : null}`,
      ],
    })
  }, [series])
  return (
    //<></>
    // @ts-ignore
    <ReactApexChart options={chartData} series={series} type="pie" width={width} height={250} />
  )
}

export default ConsultantPieChart_2
