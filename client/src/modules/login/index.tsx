import { ChangeEvent, FormEvent, useState } from "react"
import Navbar from "../../components/layouts/Navbar"
import Input from "../../components/ui/formInput"
import Button from "../../components/ui/formButton"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../helpers/validateEmail"
import { httpLoginUser } from "./services/api"
import { useDispatch } from "react-redux"
import { setCurrentUser } from "../../store/user/user.reducer"
import { useAlert } from "../../hooks/useAlert"
import {
  alertMessages,
  alertOptions,
} from "../../constants/alertOptions.enum"

const defaultFormFields = {
  email: "",
  password: "",
}

export default function LoginPage() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const [loading, setLoading] = useState(false)
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const { activateAlert } = useAlert()
  const { email, password } = formFields

  // handler function to update the state when input changes
  function onInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // validate input
    if (email.length === 0 || password.length === 0) {
      activateAlert(alertMessages.emtpyFields, alertOptions.red)
      return
    }
    if (validateEmail(email) === false) {
      activateAlert(alertMessages.invalidEmail, alertOptions.red)
      return
    }
    // login user
    try {
      setLoading(true)
      const res = await httpLoginUser(email, password)
      const data = await res?.json()
      if (res?.ok) {
        setLoading(false)
        activateAlert(alertMessages.loginSuccess, alertOptions.green)
        dispatch(setCurrentUser(data))
        redirect("/dashboard")
      } else {
        setLoading(false)
        activateAlert(data.error, alertOptions.red)
      }
    } catch (err) {
      activateAlert(alertMessages.error, alertOptions.red)
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <div className="min-h-[100vh] gradientBg">
      <Navbar />
      <div className="mt-16 flex justify-center items-center">
        <form
          className="h-[380px] w-[90%] max-w-[450px] mx-auto bg-white rounded-lg py-4 px-7 border-[1px] shadow-xl"
          onSubmit={onFormSubmit}
        >
          <p className="text-center text-2xl font-semibold m-3">
            Sign In to your Account
          </p>
          <Input
            label="Email Address"
            placeholder="Enter your Email"
            type="email"
            name="email"
            value={email}
            onChange={onInputChangeHandler}
          />
          <Input
            label="Password"
            placeholder="Enter your Password"
            type="password"
            name="password"
            value={password}
            onChange={onInputChangeHandler}
          />
          <Button isLoading={loading} text="Sign In" type="submit" />
          <p className="font-light text-sm text-zinc-600 text-center mt-4">
            Don't have account?{" "}
            <Link to="/register" className="text-black font-bold underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
