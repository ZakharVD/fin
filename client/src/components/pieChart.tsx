import { categoryOptions } from "../constants/categoryOptions"
import statisticsIllustr from "../assets/statistics.svg"
import { TStatistics } from "../types/statistics.types"
import Chart from "react-google-charts"

type Props = {
  chartData: TStatistics
}

export default function PieChart({ chartData }: Props) {

  const data = [
    ["Task", "Percent"],
    [categoryOptions.housing, chartData.housing],
    [categoryOptions.food, chartData.food],
    [categoryOptions.transportation, chartData.transportation],
    [categoryOptions.health, chartData.health],
    [categoryOptions.entertainment, chartData.entertainment],
    [categoryOptions.education, chartData.education],
    [categoryOptions.debt, chartData.debt],
    [categoryOptions.other, chartData.other],
  ]

  const options = {
    pieHole: 0.5,
    is3D: false,
    pieSliceText: "none",
    colors: [
      "#ee821a",
      "#3a7ff2",
      "#65dd91",
      "#53dbf2",
      "#f34a62",
      "#ffcb50",
      "#b67af5",
      "#ed90cf",
    ],
  }

  return (
    <>
      {chartData.housing === 0 &&
      chartData.food === 0 &&
      chartData.transportation === 0 &&
      chartData.health === 0 &&
      chartData.entertainment === 0 &&
      chartData.education === 0 &&
      chartData.debt === 0 &&
      chartData.other === 0 ? (
        <div className="w-full h-full flex flex-col text-sm sm:text-base font-normal justify-center items-center">
          <div>
            <img
              src={statisticsIllustr}
              alt=""
              className="w-28 h-28 sm:w-36 sm:h-36"
            />
          </div>
          <div className="text-center">
            <p>Add expenses to view your statistics.</p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-xl">Spendings trend:</p>
          <Chart
            chartType="PieChart"
            data={data}
            width={"95%"}
            height={"90%"}
            options={options}
          />
        </>
      )}
    </>
  )
}
