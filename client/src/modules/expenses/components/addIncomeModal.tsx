import { ChangeEvent, useState } from "react"
import { useAlert } from "../../../hooks/useAlert"
import { useDispatch } from "react-redux"
import { alertMessages, alertOptions } from "../../../constants/alertOptions.enum"
import { isOnlyNumbers } from "../../../helpers/isNumbersOnly"
import { httpAddIncome } from "../services/api"
import { setIncome } from "../../../store/income/income.reducer"
import CloseModalBtn from "../../../components/ui/closeModalBtn"
import { useModal } from "../../../hooks/useModal"
import ModalBtn from "../../../components/ui/modalBtn"

export default function AddIncomeModal({ collectionId }: { collectionId: string }) {
  const [amount, setAmount] = useState("")
  console.log(amount)
  const [loading, setLoading] = useState(false)
  const { deactivateModal } = useModal()
  const { activateAlert } = useAlert()
  const dispatch = useDispatch()

  function onAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmount(event.target.value)
  }
  async function onAddHandler() {
    // validate
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
    const formattedAmount = Number(amount)
    try {
      setLoading(true)
      if (collectionId === undefined) {
        console.log("No id in the url")
        return
      }
      const res = await httpAddIncome(collectionId, formattedAmount)
      const data = await res.json()
      if (res.ok) {
        dispatch(setIncome(data))
        setLoading(false)
        activateAlert(alertMessages.incomeAdded, alertOptions.green)
        deactivateModal()
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
        className={`w-[300px] h-[170px] bg-white font-normal rounded-md shadow-md p-4 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
      >
          <CloseModalBtn/>
        <div className="py-2 w-full flex justify-between items-center mb-1">
          <label className="mr-3 font-medium">Amount</label>
          <div className="flex flex-row items-center">
            <span>$</span>
            <input
              onChange={onAmountChange}
              placeholder="dollars"
              type="text"
              className="w-full bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <ModalBtn text="Add Income" actionFn={onAddHandler} loading={loading}/>
        </div>
      </div>
  )
}