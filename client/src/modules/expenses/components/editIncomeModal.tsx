import { useDispatch, useSelector } from "react-redux"
import CloseModalBtn from "../../../components/ui/closeModalBtn"
import { useModal } from "../../../hooks/useModal"
import { selectIncome } from "../../../store/income/income.selector"
import { httpUpdateIncome } from "../services/api"
import { ChangeEvent, useState } from "react"
import { useAlert } from "../../../hooks/useAlert"
import { alertMessages, alertOptions } from "../../../constants/alertOptions.enum"
import { isOnlyNumbers } from "../../../helpers/isNumbersOnly"
import { setIncome } from "../../../store/income/income.reducer"
import ModalBtn from "../../../components/ui/modalBtn"

export default function EditIncomeModal() {
  const income = useSelector(selectIncome)
  const [amountInput, setAmountInput] = useState(String(income.amount))
  const [loading, setLoading] = useState(false)
  const { deactivateModal } = useModal()
  const {activateAlert} = useAlert()
  const dispatch = useDispatch()

  function onAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmountInput(event.target.value)
  }

  async function onSaveHanlder() {
    // validate
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
    const formattedAmount = Number(amountInput)
    try {
      setLoading(true)
      const res = await httpUpdateIncome(income.id!, formattedAmount)
      const data = await res.json()
      if (res.ok) {
        dispatch(setIncome(data))
        deactivateModal()
        setLoading(false)
        activateAlert(alertMessages.incomeUpdated, alertOptions.green)
      } else {
        throw new Error
      }
    } catch(err) {
      setLoading(false)
      activateAlert(alertMessages.error, alertOptions.red)
      console.log(err)
    }
  }

  return (
    <div
      className={`w-[300px] h-[170px] bg-white rounded-md shadow-md p-4 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
    >
        <CloseModalBtn />
      <div className="py-2 w-full flex justify-between items-center mb-1">
        <label className="mr-3 font-medium ">Amount</label>
        <div className="flex flex-row items-center">
          <span>$</span>
          <input
            onChange={onAmountChange}
            defaultValue={income.amount}
            placeholder="dollars"
            type="text"
            className="w-full bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <ModalBtn text="Save Changes" actionFn={onSaveHanlder} loading={loading}/>
      </div>
    </div>
  )
}
