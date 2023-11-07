import { useDispatch, useSelector } from "react-redux"
import CloseModalBtn from "../../../components/ui/closeModalBtn"
import ModalBtn from "../../../components/ui/modalBtn"
import { useModal } from "../../../hooks/useModal"
import { selectGoal } from "../../../store/goals/goals.selector"
import { ChangeEvent, useState } from "react"
import { isOnlyNumbers } from "../../../helpers/isNumbersOnly"
import { useAlert } from "../../../hooks/useAlert"
import {
  alertMessages,
  alertOptions,
} from "../../../constants/alertOptions.enum"
import { httpAddToGoal } from "../services/api"
import { setGoal } from "../../../store/goals/goals.reducer"

export default function AddGoalModal() {
  const [amountInput, setAmountInput] = useState("")
  const [loading, setLoading] = useState(false)
  const { deactivateModal } = useModal()
  const { activateAlert } = useAlert()
  const goal = useSelector(selectGoal)
  const dispatch = useDispatch()

  function onAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmountInput(event.target.value)
  }

  async function onAddHandler() {
    // validate input
    if (isOnlyNumbers(amountInput) === false) {
      activateAlert(alertMessages.onlyNumbers, alertOptions.red)
      return
    }
    const inputFormatted = Number(amountInput)
    try {
      setLoading(true)
      if (goal.id !== "") {
        const res = await httpAddToGoal(inputFormatted, goal.id)
        const data = await res.json()
        if (res.ok) {
          dispatch(setGoal(data))
          deactivateModal()
          setLoading(false)
          activateAlert(alertMessages.goalContributed, alertOptions.green)
        } else {
          throw new Error()
        }
      } else {
        throw new Error()
      }
    } catch (err) {
      console.log(err)
      activateAlert(alertMessages.error, alertOptions.red)
      deactivateModal()
      setLoading(false)
    }
  }

  return (
    <div
      className={`w-[300px] h-[170px] bg-white rounded-md shadow-md p-4 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
    >
      <CloseModalBtn />
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
        <ModalBtn loading={loading} text="Contribute" actionFn={onAddHandler} />
      </div>
    </div>
  )
}
