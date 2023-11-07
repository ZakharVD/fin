import { useParams, useNavigate } from "react-router"
import Sidebar from "../dashboard/components/sidebar"
import MobileNavbar from "../dashboard/components/MobileNavbar"
import { useEffect, useState } from "react"
import {
  httpGetCollectionInfo,
  httpGetExpenses,
  httpGetTotalIncome,
} from "./services/api"
import { TCollection } from "../../types/collections.types"
import { formatCollectionDate } from "../../helpers/formatCollectionDate"
import StatsBlock from "../dashboard/components/totalStatsBlock"
import AddExpenseButton from "./components/addExpenseBtn"
import { formatCurrency } from "../../helpers/formatCurrency"
import { TIncome } from "../../types/income.types"
import { useDispatch, useSelector } from "react-redux"
import { setExpenses } from "../../store/expenses/expenses.reducer"
import { selectExpenses } from "../../store/expenses/expenses.selector"
import { selectIncome } from "../../store/income/income.selector"
import { setIncome } from "../../store/income/income.reducer"
import LoadingBlock from "../../components/ui/loadingBlock"
import PieChart from "../../components/pieChart"
import incomeIcon from "../../assets/income.png"
import expenseIcon from "../../assets/expense.png"
import cashFlowIcon from "../../assets/money-flow.png"
import Table from "./components/table"
import IncomeButtons from "./components/incomeBtns"
import { selectCurrentUser } from "../../store/user/user.selector"

export default function ExpensesPage() {
  const [collectionData, setCollectionData] = useState<TCollection | null>(null)
  const [loading, setLoading] = useState(true)
  const { collectionId } = useParams()
  const dispatch = useDispatch()
  const { expenses, totalExpense, statistics } = useSelector(selectExpenses)
  const { amount } = useSelector(selectIncome)
  const user = useSelector(selectCurrentUser)
  const redirect = useNavigate()

  useEffect(() => {
    if (user === null) {
      console.log("unauthorized")
      redirect("/")
      return
    }
  }, [user])

  useEffect(() => {
    if (!collectionId) {
      console.log("No collection in the URL")
      return
    }
    // get all expenses for this collection
    httpGetExpenses(collectionId)
      .then((res) => res.json())
      .then((data) => dispatch(setExpenses(data)))
      .finally(() => setLoading(false))
    // get the name for this collection
    httpGetCollectionInfo(collectionId)
      .then((res) => res.json())
      .then((data) => setCollectionData(data))
      .finally(() => setLoading(false))
    // get total income for this collection
    httpGetTotalIncome(collectionId)
      .then((res) => res.json())
      .then((data: TIncome) => dispatch(setIncome(data)))
      .finally(() => setLoading(false))
  }, [])

  function checkTotalExpense(): string {
    if (totalExpense === undefined) {
      return "0"
    }
    return formatCurrency(totalExpense)
  }

  function renderMonthName() {
    if (collectionData !== null) {
      return (
        <p className="font-medium text-2xl sm:text-3xl lg:text-4xl">
          {formatCollectionDate(collectionData.collectionName)}
        </p>
      )
    }
  }

  return (
      <div className="flex flex-col sm:flex-row">
        <Sidebar />
        <MobileNavbar />
        <section className="bg-background h-auto sm:h-screen w-full flex flex-col justify-center items-center p-4">
          <div className="h-[60%] lg:h-[40%] flex flex-col lg:flex-row w-full mb-4">
            <div className="lg:w-[70%] h-full lg:mr-4">
              <div className="h-[30%]">
                <div className="bg-white w-full h-full p-2 sm:p-4 rounded-md border-[1px] shadow-sm flex items-center">
                  {loading ? (
                    <div className="h-full w-full sm:w-1/3 flex justify-center items-center">
                      <LoadingBlock />
                    </div>
                  ) : (
                    renderMonthName()
                  )}
                </div>
              </div>
              <div className="h-[70%] flex flex-col sm:flex-row justify-between pt-4">
                <StatsBlock
                  options={<IncomeButtons collectionId={collectionId!}/>}
                  icon={incomeIcon}
                  loading={loading}
                  title="Income:"
                  amount={formatCurrency(amount)}
                  heaghtAndWidth="w-12 h-12"
                  background="bg-purple"
                />
                <StatsBlock
                  icon={expenseIcon}
                  loading={loading}
                  title="Expenses:"
                  amount={checkTotalExpense()}
                  heaghtAndWidth="w-12 h-12"
                  background="bg-blue"
                />
                <StatsBlock
                  icon={cashFlowIcon}
                  loading={loading}
                  title="Cash flow:"
                  amount={formatCurrency(amount - totalExpense)}
                  heaghtAndWidth="w-10 h-10"
                  background="bg-lightorange"
                />
              </div>
            </div>
            <div className="lg:w-[30%] bg-white border-[1px] shadow-sm mt-4 lg:mt-0 sm:mr-0 p-4 rounded-md">
            {loading ? (
                <div className="w-full h-full">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <LoadingBlock marginBottom={4} key={index} />
                  ))}
                </div>
              ) : (
                <PieChart chartData={statistics}/>
              )}
            </div>
          </div>
          <div className="h-[40%] lg:h-[60%] bg-white shadow-sm border-[1px] w-full relative p-4 rounded-md overflow-scroll">
            <div className="w-full flex justify-between items-center mb-4">
              <p className="font-medium text-2xl">Expenses:</p>
              <div>
                <AddExpenseButton />
              </div>
            </div>
            {loading ? (
              <div className="w-full h-full">
                {Array.from({ length: 4 }).map((_, index) => (
                  <LoadingBlock marginBottom={4} key={index} />
                ))}
              </div>
            ) : (
              <Table data={expenses}/>
            )}
          </div>
        </section>
      </div>
  )
}
