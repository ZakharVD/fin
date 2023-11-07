import { ChangeEvent, InputHTMLAttributes, useState } from "react"
import CloseModalBtn from "../../../components/ui/closeModalBtn"
import ModalBtn from "../../../components/ui/modalBtn"
import { useAlert } from "../../../hooks/useAlert"
import {
  alertMessages,
  alertOptions,
} from "../../../constants/alertOptions.enum"
import { validateEmail } from "../../../helpers/validateEmail"
import { useDispatch } from "react-redux"
import { httpUpdateEmail } from "../services/api"
import { setCurrentUser } from "../../../store/user/user.reducer"
import { useModal } from "../../../hooks/useModal"

const defaultFormFields = {
  email: "",
  confirmEmail: "",
}

export default function EditEmailModal() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, confirmEmail } = formFields
  const [loading, setLoading] = useState(false) 
  const { activateAlert } = useAlert()
  const { deactivateModal } = useModal()
  const dispatch = useDispatch()

  function onInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  async function onConfirmHandler() {
    // validate
    if (email.length === 0 || confirmEmail.length === 0) {
      activateAlert(alertMessages.emtpyFields, alertOptions.red)
      return
    }
    if (email !== confirmEmail) {
      activateAlert(alertMessages.emailDoesNotMatch, alertOptions.red)
      return
    }
    if (validateEmail(email) === false) {
      activateAlert(alertMessages.invalidEmail, alertOptions.red)
      return
    }
    try {
        setLoading(true)
      const res = await httpUpdateEmail(email)
      const data = await res.json()
      if (res.ok) {
        dispatch(setCurrentUser(data))
        deactivateModal()
        setLoading(false)
        activateAlert(alertMessages.emailUpdated, alertOptions.green)
      } else {
        activateAlert(data.error, alertOptions.red)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
      activateAlert(alertMessages.error, alertOptions.red)
    }
  }

  return (
    <div
      className={`w-[300px] h-[230px] bg-white rounded-md shadow-md p-4 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
    >
      <CloseModalBtn />
      <div className="mb-2">
        <ModalInput
          label="Enter new email address"
          name="email"
          value={email}
          onChange={onInputChangeHandler}
        />
        <ModalInput
          label="Confirm new email address"
          name="confirmEmail"
          value={confirmEmail}
          onChange={onInputChangeHandler}
        />
      </div>
      <div className="flex flex-col justify-between">
        <ModalBtn text="Update email" actionFn={onConfirmHandler} loading={loading}/>
      </div>
    </div>
  )
}

type Props = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

function ModalInput({ label, ...props }: Props) {
  return (
    <div>
      <label className="">{label}</label>
      <input
        className="bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none w-full"
        {...props}
      />
    </div>
  )
}
