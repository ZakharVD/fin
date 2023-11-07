import CloseModalBtn from "../../../components/ui/closeModalBtn"
import { ChangeEvent, useEffect, useState } from "react"
import { TExpense } from "../../../types/expenses.types"
import {
  httpDeleteExpense,
  httpGetExpense,
  httpGetExpenses,
  httpUpdateExpense,
} from "../services/api"
import LoadingBlock from "../../../components/ui/loadingBlock"
import TableCol from "../../../components/ui/tableCol"
import { useModal } from "../../../hooks/useModal"
import { useAlert } from "../../../hooks/useAlert"
import {
  alertMessages,
  alertOptions,
} from "../../../constants/alertOptions.enum"
import { useDispatch } from "react-redux"
import { setExpenses } from "../../../store/expenses/expenses.reducer"
import DayDropdown from "./dayDropdown"
import LabelDropdown from "./labelDropdown"
import ModalBtn from "../../../components/ui/modalBtn"
import { isOnlyNumbers } from "../../../helpers/isNumbersOnly"
import { formatDay } from "../../../helpers/formatDay"
import DeleteBtn from "../../../components/ui/deleteBtn"


type Props = {
  expenseId: string,
  collectionId: string,
}

export function ViewExpenseModal({ expenseId, collectionId }: Props) {
  const [expenseData, setExpenseData] = useState<TExpense | null>(null)
  const [dayInput, setDayInput] = useState("")
  console.log(dayInput)
  const [labelInput, setLabelInput] = useState("")
  const [amountInput, setAmountInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false)
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { activateAlert } = useAlert()
  const dispatch = useDispatch()
  const { showModal, deactivateModal } = useModal()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await httpGetExpense(expenseId)
        const data: TExpense = await res.json()
        if (res.ok) {
          setExpenseData(data)
          setLabelInput(data.label)
          setDayInput(data.day)
          setAmountInput(data.amount)
          setDescriptionInput(data.description)
          setDataLoading(false)
        }
      } catch (err) {
        console.log(err)
        activateAlert(alertMessages.error, alertOptions.red)
      }
    }
    fetchData()
  }, [showModal])

  function toggleDayOpen() {
    setIsDayDropdownOpen((prev) => !prev)
  }
  function handleDaySelect(day: string) {
    setDayInput(day)
  }
  function toggleLabelOpen() {
    setIsLabelDropdownOpen((prev) => !prev)
  }
  function handleLabelSelect(label: string) {
    setLabelInput(label)
  }
  function onAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmountInput(event.target.value)
  }
  function onDescChange(event: ChangeEvent<HTMLInputElement>) {
    setDescriptionInput(event.target.value)
  }

  async function onDeleteHandler() {
    try {
      setDeleteLoading(true)
      const res = await httpDeleteExpense(expenseId)
      if (res.ok) {
        deactivateModal()
        activateAlert(alertMessages.expenseDeleted, alertOptions.green)
      } else {
        throw new Error()
      }
      if (expenseData?.collectionId !== undefined) {
        const res = await httpGetExpenses(expenseData?.collectionId)
        const data = await res.json()
        dispatch(setExpenses(data))
        setDeleteLoading(false)
      }
    } catch (err) {
      setDeleteLoading(false)
      activateAlert(alertMessages.error, alertOptions.red)
      console.log(err)
    }
  }

  async function onSaveHandler() {
    // validate
    if (dayInput.length < 1) {
      activateAlert(alertMessages.invalidDay, alertOptions.red)
      return
    }
    if (amountInput.length < 1) {
      activateAlert(alertMessages.invalidAmount, alertOptions.red)
      return
    }
    if (isOnlyNumbers(amountInput) === false) {
      activateAlert(alertMessages.onlyNumbers, alertOptions.red)
      return
    }
    if (Number(amountInput) > 100000000) {
      activateAlert(alertMessages.amountTooLarge, alertOptions.red)
      return
    }
    if (Number(amountInput) < 1) {
      activateAlert(alertMessages.negativeAmount, alertOptions.red)
    }
    if (labelInput.length < 1) {
      activateAlert(alertMessages.missingCategory, alertOptions.red)
      return
    }
    if (descriptionInput.length > 30) {
      activateAlert(alertMessages.descriptionTooLong, alertOptions.red)
    }
    const formattedDay = formatDay(dayInput)
    const formattedAmount = Number(amountInput)
    try {
      setUpdateLoading(true)
      const res = await httpUpdateExpense(formattedDay, formattedAmount, descriptionInput, labelInput, expenseId)
      if (res.ok) {
        const rs = await httpGetExpenses(collectionId)
        const dt = await rs.json()
        if (res.ok) {
          dispatch(setExpenses(dt))
          setUpdateLoading(false)
          deactivateModal()
          activateAlert(alertMessages.expenseUpdated, alertOptions.green)
        } else {
          throw Error
        }
      } else {
        throw Error
      }
    } catch (err) {
      console.log(err)
      setUpdateLoading(false)
      activateAlert(alertMessages.error, alertOptions.red)
    }
  }

  return (
    <div
      className={`w-[95%] max-w-[500px] h-[290px] bg-white rounded-md shadow-md p-4 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
    >
      <CloseModalBtn />
      <>
        {dataLoading === true ? (
          <div className="w-full h-full mt-5">
            <LoadingBlock marginBottom={4} />
          </div>
        ) : (
          <div>
            <div className="flex flex-row w-full justify-between font-medium border-b-[1px]">
              <TableCol text="Day" />
              <TableCol text="Amount" />
              <TableCol text="Label" />
              <TableCol isLastColumn={true} text="Description" />
            </div>
            <div className="flex flex-row w-full justify-between font-normal">
              <div className="w-[25%] text-center p-2 border-r-[1px] flex justify-center">
                <DayDropdown
                  value={dayInput}
                  isOpen={isDayDropdownOpen}
                  handleDaySelect={handleDaySelect}
                  toggleOpen={toggleDayOpen}
                />
              </div>
              <div className="w-[25%] text-center p-2 border-r-[1px] flex justify-center">
                <div className="flex flex-row items-center w-full">
                  <span>$</span>
                  <input
                    onChange={onAmountChange}
                    placeholder="dollars"
                    type="text"
                    className="bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none w-full"
                    defaultValue={expenseData?.amount}
                  />
                </div>
              </div>
              <div className="w-[25%] text-center p-2 border-r-[1px] flex justify-center">
                <LabelDropdown
                  isOpen={isLabelDropdownOpen}
                  value={labelInput}
                  handleLabelSelect={handleLabelSelect}
                  toggleOpen={toggleLabelOpen}
                />
              </div>
              <div className="w-[25%] text-center p-2 flex justify-center">
                <input
                  onChange={onDescChange}
                  placeholder="max 25 char"
                  type="text"
                  className="bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none w-full"
                  defaultValue={expenseData?.description}
                />
              </div>
            </div>
          </div>
        )}
      </>
      <div className="flex flex-col">
        <ModalBtn text="Save" actionFn={onSaveHandler} customStyle="mb-2" loading={updateLoading}/>
        <DeleteBtn loading={deleteLoading} onClickHandler={onDeleteHandler}/>
      </div>
    </div>
  )
}
