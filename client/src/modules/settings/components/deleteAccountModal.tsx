import { useDispatch } from "react-redux"
import CloseModalBtn from "../../../components/ui/closeModalBtn"
import { useAlert } from "../../../hooks/useAlert"
import { httpDeleteAccount } from "../services/api"
import { useModal } from "../../../hooks/useModal"
import { clearUser } from "../../../store/user/user.reducer"
import { useNavigate } from "react-router-dom"
import { alertMessages, alertOptions } from "../../../constants/alertOptions.enum"
import { useState } from "react"
import DeleteBtn from "../../../components/ui/deleteBtn"

export default function DeleteAccountModal() {
  const { activateAlert } = useAlert()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const {deactivateModal} = useModal()
  const redirect = useNavigate()

  async function onDeleteHandler() {
    try {
        setLoading(true)
      const res = await httpDeleteAccount()
      if (res.ok) {
        localStorage.removeItem("token")
        dispatch(clearUser())
        deactivateModal()
        setLoading(false)
        redirect("/")
        activateAlert(alertMessages.accountDeleted, alertOptions.green)
        return
      } else {
        throw Error
      }
    } catch (err) {
        setLoading(false)
        console.log(err) 
        activateAlert(alertMessages.error, alertOptions.red)
    }
  }

  return (
    <div
      className={`w-[300px] h-[170px] bg-white rounded-md shadow-md p-4 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
    >
      <CloseModalBtn />
      <div className="text-center mb-2">
        <p>Are you sure you want to delete your account?</p>
      </div>
      <div className="flex flex-col justify-between">
        <DeleteBtn onClickHandler={onDeleteHandler} loading={loading}/>
      </div>
    </div>
  )
}
