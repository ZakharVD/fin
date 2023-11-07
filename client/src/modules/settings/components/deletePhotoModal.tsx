import { useDispatch } from "react-redux"
import CloseModalBtn from "../../../components/ui/closeModalBtn"
import {
  alertMessages,
  alertOptions,
} from "../../../constants/alertOptions.enum"
import { useAlert } from "../../../hooks/useAlert"
import { useModal } from "../../../hooks/useModal"
import { httpDeleteFile } from "../services/api"
import { setCurrentUser } from "../../../store/user/user.reducer"
import { useState } from "react"
import DeleteBtn from "../../../components/ui/deleteBtn"

export default function DeletePhotoModal() {
  const { activateAlert } = useAlert()
  const { deactivateModal } = useModal()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  async function onDeleteHandler() {
    try {
      setLoading(true)
      const res = await httpDeleteFile()
      if (res.ok) {
        const data = await res.json()
        dispatch(setCurrentUser(data))
        deactivateModal()
        setLoading(false)
        activateAlert(alertMessages.profilePictureDelete, alertOptions.green)
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
        <p>Are you sure you want to delete your profile picture?</p>
      </div>
      <div className="flex flex-col justify-between">
       <DeleteBtn onClickHandler={onDeleteHandler} loading={loading}/>
      </div>
    </div>
  )
}
