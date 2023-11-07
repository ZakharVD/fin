import { ChangeEvent, useState } from "react"
import { getCurrentMonth } from "../../../helpers/getCurrentMonth"
import { useAlert } from "../../../hooks/useAlert"
import { useNavigate } from "react-router-dom"
import { alertMessages, alertOptions } from "../../../constants/alertOptions.enum"
import { isMonthInFuture } from "../../../helpers/isMonthFuture"
import { httpAddCollection } from "../services/api"
import CloseModalBtn from "../../../components/ui/closeModalBtn"
import { useModal } from "../../../hooks/useModal"
import ModalBtn from "../../../components/ui/modalBtn"

export default function AddCollectionModal() {
    const defaultValue = getCurrentMonth()
    const [input, setInput] = useState(defaultValue)
    const { deactivateModal } = useModal()
    const [loading, setLoading] = useState(false)
    const { activateAlert } = useAlert()
    const redirect = useNavigate()
  
    function onChange(event: ChangeEvent<HTMLInputElement>) {
      setInput(event.target.value)
      return
    }
    async function onAddHandler() {
      // validate inputs
      if (!input) {
        activateAlert(alertMessages.invalidMonth, alertOptions.red)
        return
      }
      if (isMonthInFuture(input) === true) {
        activateAlert(alertMessages.futureMonth, alertOptions.red)
        return
      }
      try {
        setLoading(true)
        const res = await httpAddCollection(input)
        const data = await res.json()
        if (res.ok) {
          setLoading(false)
          deactivateModal()
          redirect(`/dashboard/collections/${data.id}`)
          activateAlert(alertMessages.collectionCreated, alertOptions.green)
        } else {
          setLoading(false)
          activateAlert(data.error, alertOptions.red)
        }
      } catch (err) {
        setLoading(false)
        activateAlert(alertMessages.error, alertOptions.red)
        console.log(err)
      }
    }
    return (
      <div
        className={`w-[95%] mx-auto max-w-[400px] h-[250px] bg-white rounded-md shadow-md p-3 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
      >
          <CloseModalBtn/>
        <p className="w-full text-center text-xl font-medium">Select a month</p>
        <form className="h-full my-3">
          <input
            className="h-full w-full text-lg rounded-md px-16 font-medium border-[1px] focus:border-gray-400 focus:outline-none"
            type="month"
            onChange={onChange}
            defaultValue={defaultValue}
          />
        </form>
        <div className="flex flex-col justify-between">
          <ModalBtn text="Create" actionFn={onAddHandler} loading={loading}/>
        </div>
      </div>
    )
  
  
  }