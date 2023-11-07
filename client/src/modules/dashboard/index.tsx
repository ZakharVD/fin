import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "./components/sidebar"
import MobileNavbar from "./components/MobileNavbar"
import CollectionSection from "./components/collection"
import { httpGetGoal, httpGetStatistics, httpGetTotalCashFlow } from "./services/api"
import LoadingBlock from "../../components/ui/loadingBlock"
import { selectStatistics } from "../../store/statistics/statistics.selector"
import { setStatistics } from "../../store/statistics/statistics.reducer"
import PieChart from "../../components/pieChart"
import GoalBlock from "./components/goalBlock"
import CashFlowBlock from "./components/cashFlowBlock"
import { setGoal } from "../../store/goals/goals.reducer"
import { TTotalCashFlow } from "../../types/statistics.types"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [cashFlow, setCashFlow] = useState<TTotalCashFlow>({
    totalCashFlow: 0
  })
  const user = useSelector(selectCurrentUser)
  const redirect = useNavigate()
  const statistics = useSelector(selectStatistics)
  const dispatch = useDispatch()
  const currentDate = new Date()
  const currentDateFormatted = currentDate.toDateString()

  useEffect(() => {
    httpGetStatistics()
      .then((res) => res.json())
      .then((data) => dispatch(setStatistics(data)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
    httpGetGoal()
      .then((res) => res.json())
      .then((data) => dispatch(setGoal(data)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
    httpGetTotalCashFlow()
      .then((res) => res.json())
      .then((data) => setCashFlow(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (user === null) {
      console.log("unauthorized")
      redirect("/")
      return
    }
  }, [user])

  return (
    <div className="flex flex-col sm:flex-row">
      <Sidebar/>
      <MobileNavbar />
      <section className="bg-background h-auto sm:h-screen w-full">
        <div className="h-[75%] sm:h-1/2 lg:h-[40%] flex flex-col lg:flex-row">
          <div className="lg:w-[65%] h-1/2 lg:h-auto flex flex-col">
            <div className="h-[30%] p-4">
              <div className="bg-white w-full h-full p-4 rounded-md border-[1px] shadow-sm flex justify-between items-center">
                <p className="font-medium text-2xl sm:3xl">
                  Dashboard
                </p>
                <div className="font-extralight opacity-80">
                  {currentDateFormatted}
                </div>
              </div>
            </div>
            <div className="h-[70%] flex flex-col sm:flex-row justify-between px-4 sm:pl-4">
              <GoalBlock />
              <CashFlowBlock totalCashFlow={cashFlow.totalCashFlow} loading={loading} />
            </div>
          </div>
          <div className="lg:w-[35%] h-1/2 lg:h-auto p-4 lg:pt-4 lg:pr-4 lg:pb-0 lg:pl-0">
            <div className="bg-white p-4 w-full h-full rounded-md border-[1px] shadow-sm font-medium">
              {loading ? (
                <div className="w-full h-full">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <LoadingBlock marginBottom={4} key={index} />
                  ))}
                </div>
              ) : (
                <PieChart chartData={statistics} />
              )}
            </div>
          </div>
        </div>
        <CollectionSection />
      </section>
    </div>
  )
}
