import { ChangeEvent, useState } from "react"
import CloseModalBtn from "../../../components/ui/closeModalBtn"
import ModalBtn from "../../../components/ui/modalBtn"
import { useModal } from "../../../hooks/useModal"
import { useDispatch, useSelector } from "react-redux"
import { selectGoal } from "../../../store/goals/goals.selector"
import { httpCreateGoal } from "../services/api"
import { useAlert } from "../../../hooks/useAlert"
import { alertMessages, alertOptions } from "../../../constants/alertOptions.enum"
import { isOnlyNumbers } from "../../../helpers/isNumbersOnly"
import { setGoal } from "../../../store/goals/goals.reducer"

export default function CreateGoalModal() {
  const goal = useSelector(selectGoal)
  const [nameInput, setNameInput] = useState(goal.name)
  const [amountInput, setAmountInput] = useState(String(goal.amount))
  const [targetInput, setTargetInput] = useState(String(goal.targetAmount))
  const { deactivateModal } = useModal()
  const [loading, setLoading] = useState(false)
  const {activateAlert} = useAlert()
  const dispatch = useDispatch()

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    setNameInput(event.target.value)
  }

  function onAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmountInput(event.target.value)
  }

  function onTargetChange(event: ChangeEvent<HTMLInputElement>) {
    setTargetInput(event.target.value)
  }

  async function onCreateHandler() {
    // validate
    if (nameInput.length < 1) {
      activateAlert(alertMessages.emtpyFields, alertOptions.red)
      return
    }
    if (nameInput.length > 15) {
      activateAlert(alertMessages.tooManySymbols, alertOptions.red)
      return
    }
    if (isOnlyNumbers(amountInput) === false || isOnlyNumbers(targetInput) === false) {
      activateAlert(alertMessages.onlyNumbers, alertOptions.red)
      return
    }
    if (targetInput.length < 1 || Number(targetInput) < 1) {
      activateAlert("Target amount cannot be 0.", alertOptions.red)
      return
    }
    const amountInputFormatted = Number(amountInput)
    const targetInputFormatted = Number(targetInput)

    try {
      setLoading(true)
      const res = await httpCreateGoal(nameInput, amountInputFormatted, targetInputFormatted) 
      const data = await res.json()
      if (res.ok) {
        dispatch(setGoal(data))
        deactivateModal()
        setLoading(false)
        activateAlert(alertMessages.goalCreated, alertOptions.green)
      } else {
        throw new Error
      }
    } catch(err) {
      setLoading(false)
      console.log(err)
      deactivateModal()
    }
  }

  return (
    <div
      className={`w-[300px] h-[260px] bg-white rounded-md shadow-md p-4 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
    >
        <CloseModalBtn />
      <div className="w-full flex justify-between items-center">
        <label className="mr-3 font-medium">Name</label>
        <div className="flex flex-row items-center">
          <input
            defaultValue={goal.name!}
            onChange={onNameChange}
            placeholder="Goal"
            type="text"
            className="w-full bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <label className="mr-3 font-medium">Target</label>
        <div className="flex flex-row items-center">
          <span>$</span>
          <input
            onChange={onTargetChange}
            defaultValue={String(goal.targetAmount)}
            placeholder="dollars"
            type="text"
            className="w-full bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="w-full flex justify-between items-center mb-1">
        <label className="mr-3 font-medium">Current</label>
        <div className="flex flex-row items-center">
          <span>$</span>
          <input
            defaultValue={String(goal.amount)}
            onChange={onAmountChange}
            placeholder="dollars"
            type="text"
            className="w-full bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <ModalBtn text="Create" actionFn={onCreateHandler} loading={loading}/>
      </div>
    </div>
  )
}
