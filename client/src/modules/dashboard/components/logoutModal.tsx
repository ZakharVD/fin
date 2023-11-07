import { useDispatch } from "react-redux"
import CloseModalBtn from "../../../components/ui/closeModalBtn"
import { useModal } from "../../../hooks/useModal"
import { clearUser } from "../../../store/user/user.reducer"
import { useNavigate } from "react-router-dom"
import {
  alertMessages,
  alertOptions,
} from "../../../constants/alertOptions.enum"
import { useAlert } from "../../../hooks/useAlert"
import ModalBtn from "../../../components/ui/modalBtn"

export default function LogoutModal() {
  const { deactivateModal } = useModal()
  const { activateAlert } = useAlert()
  const dispatch = useDispatch()
  const redirect = useNavigate()

  function onConfirmHandler() {
    localStorage.removeItem("token")
    dispatch(clearUser())
    deactivateModal()
    redirect("/")
    activateAlert(alertMessages.logoutSuccess, alertOptions.green)
    return
  }

  return (
    <div
      className={`w-[300px] h-[170px] bg-white rounded-md shadow-md p-4 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
    >
      <CloseModalBtn />
      <div className="text-center mb-2">
        <p>Are you sure you want to logout?</p>
      </div>
      <div className="flex flex-col justify-between">
        <ModalBtn text="Confirm" actionFn={onConfirmHandler} />
      </div>
    </div>
  )
}
