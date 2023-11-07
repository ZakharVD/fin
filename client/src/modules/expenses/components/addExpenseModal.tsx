import { ChangeEvent, useState } from "react"
import { useAlert } from "../../../hooks/useAlert"
import { useDispatch } from "react-redux"
import getCurrentDay from "../../../helpers/getCurrentDay"
import {
  alertMessages,
  alertOptions,
} from "../../../constants/alertOptions.enum"
import { isOnlyNumbers } from "../../../helpers/isNumbersOnly"
import { formatDay } from "../../../helpers/formatDay"
import { httpAddExpense } from "../services/api"
import { setExpenses } from "../../../store/expenses/expenses.reducer"
import CloseModalBtn from "../../../components/ui/closeModalBtn"
import TableCol from "../../../components/ui/tableCol"
import { useModal } from "../../../hooks/useModal"
import ModalBtn from "../../../components/ui/modalBtn"
import DayDropdown from "./dayDropdown"
import LabelDropdown from "./labelDropdown"

export default function AddExpenseModal({
  collectionId,
}: {
  collectionId: string
}) {
  const [amount, setAmount] = useState("")
  const [label, setLabel] = useState("select")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const currentDayFormatted = getCurrentDay()
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false)
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false)
  const [day, setDay] = useState(currentDayFormatted)
  const { deactivateModal } = useModal()
  const dispatch = useDispatch()
  const { activateAlert } = useAlert()

  function toggleDayOpen() {
    setIsDayDropdownOpen((prev) => !prev)
  }
  function handleDaySelect(day: string) {
    setDay(day)
  }
  function toggleLabelOpen() {
    setIsLabelDropdownOpen((prev) => !prev)
  }
  function handleLabelSelect(label: string) {
    setLabel(label)
  }
  function onAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmount(event.target.value)
  }
  function onDescChange(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value)
  }

  async function onAddHandler() {
    // validate
    if (day.length < 1) {
      activateAlert(alertMessages.invalidDay, alertOptions.red)
      return
    }
    if (amount.length < 1) {
      activateAlert(alertMessages.invalidAmount, alertOptions.red)
      return
    }
    if (isOnlyNumbers(amount) === false) {
      activateAlert(alertMessages.onlyNumbers, alertOptions.red)
      return
    }
    if (Number(amount) > 100000000) {
      activateAlert(alertMessages.amountTooLarge, alertOptions.red)
      return
    }
    if (Number(amount) < 1) {
      activateAlert(alertMessages.negativeAmount, alertOptions.red)
    }
    if (label.length < 1) {
      activateAlert(alertMessages.missingCategory, alertOptions.red)
      return
    }
    if (description.length > 30) {
      activateAlert(alertMessages.descriptionTooLong, alertOptions.red)
    }
    const formattedDay = formatDay(day)
    const formattedAmount = Number(amount)
    try {
      setLoading(true)
      if (collectionId === undefined) {
        console.log("No id in the url")
        return
      }
      setLoading(true)
      const res = await httpAddExpense(
        collectionId,
        formattedAmount,
        description,
        label,
        formattedDay
      )
      const data = await res.json()
      if (res.ok) {
        dispatch(setExpenses(data))
        setLoading(false)
        deactivateModal()
        activateAlert(alertMessages.expenseAdded, alertOptions.green)
      } else {
        throw new Error()
      }
    } catch (err) {
      setLoading(false)
      activateAlert(alertMessages.error, alertOptions.red)
      console.log(err)
    }
  }

  return (
    <div
      className={`w-[95%] max-w-[500px] mx-auto h-[220px] bg-white rounded-md shadow-md p-4 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
    >
      <CloseModalBtn />
      <div className="">
        <div className="flex flex-row w-full justify-between font-medium border-b-[1px]">
          <TableCol text="Day" />
          <TableCol text="Amount" />
          <TableCol text="Label" />
          <TableCol isLastColumn={true} text="Description" />
        </div>
        <div className="flex flex-row w-full justify-between font-normal">
          <div className="w-[25%] text-center p-2 border-r-[1px] flex justify-center">
            <DayDropdown value={day} toggleOpen={toggleDayOpen} handleDaySelect={handleDaySelect} isOpen={isDayDropdownOpen}/>
          </div>
          <div className="w-[25%] text-center p-2 border-r-[1px] flex justify-center">
            <div className="flex flex-row items-center w-full">
              <span>$</span>
              <input
                onChange={onAmountChange}
                placeholder="dollars"
                type="text"
                className="bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none w-full"
              />
            </div>
          </div>
          <div className="w-[25%] text-center p-2 border-r-[1px] flex justify-center">
            <LabelDropdown value={label} toggleOpen={toggleLabelOpen} isOpen={isLabelDropdownOpen} handleLabelSelect={handleLabelSelect}/>
          </div>
          <div className="w-[25%] text-center p-2 flex justify-center">
            <input
              onChange={onDescChange}
              placeholder="max 25 char"
              type="text"
              className="bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <ModalBtn text="Add" actionFn={onAddHandler} loading={loading}/>
      </div>
    </div>
  )
}
