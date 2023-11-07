/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "../../components/layouts/Navbar"
import Input from "../../components/ui/formInput"
import Button from "../../components/ui/formButton"
import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useState } from "react"
import { formatInput } from "../../helpers/formatInpur"
import { validateEmail } from "../../helpers/validateEmail"
import { httpRegisterUser } from "./services/api"
import illustration from "../../assets/auth-illustr.svg"
import { useAlert } from "../../hooks/useAlert"
import { alertMessages, alertOptions } from "../../constants/alertOptions.enum"
import { isOnlyLetters } from "../../helpers/isLettersOnly"
import { useDispatch } from "react-redux"
import { setCurrentUser } from "../../store/user/user.reducer"

const defaultFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export default function RegisterPage() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { firstName, lastName, email, password, confirmPassword } = formFields
  const [loading, setLoading] = useState(false)
  const redirect = useNavigate()
  const { activateAlert } = useAlert()
  const dispatch = useDispatch()

  // handler function to update the state when input changes
  function onInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // validate input
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0
    ) {
      activateAlert(alertMessages.emtpyFields, alertOptions.red)
      return
    }
    if (firstName.length > 15 || lastName.length > 15) {
      activateAlert(alertMessages.tooManySymbols, alertOptions.red)
      return
    }
    if (isOnlyLetters(firstName) === false || isOnlyLetters(lastName) === false) {
      activateAlert(alertMessages.invalidSymbols, alertOptions.red)
      return
    }
    if (validateEmail(email) === false) {
      activateAlert(alertMessages.invalidEmail, alertOptions.red)
      return
    }
    if (password.length < 6) {
      activateAlert(alertMessages.shortPassword, alertOptions.red)
      return
    }
    if (password !== confirmPassword) {
      activateAlert(alertMessages.passwordMismatch, alertOptions.red)
      return
    }
    // format values
    const formattedFirstName = formatInput(firstName)
    const formattedLastName = formatInput(lastName)
    // register
    try {
      setLoading(true)
      const res = await httpRegisterUser(
        formattedFirstName,
        formattedLastName,
        email,
        password
      )
      const data = await res?.json()
      if (res?.ok) {
        dispatch(setCurrentUser(data))
        setLoading(false)
        redirect("/dashboard")
        activateAlert(alertMessages.userCreated, alertOptions.green)
      } else {
        activateAlert(data.error, alertOptions.red);
        setLoading(false)
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
      <div className="min-h-[90vh] w-[90%] max-w-[1500px] mx-auto flex flex-row justify-center items-center">
        <div className="hidden lg:flex lg:justify-center lg:items-center lg:w-1/2">
          <div className="flex justify-center items-center flex-col">
            <img src={illustration} alt="" className="h-[450px] w-[450px]" />
            <h4 className="text-3xl font-medium">Take control over your finances.</h4>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center items-center">
          <form
            className="h-[650px] sm:h-[550px] w-[100%] max-w-[430px] mx-auto bg-white rounded-lg py-4 px-7 border-[1px] shadow-xl"
            onSubmit={onFormSubmit}
          >
            <p className="text-center text-2xl font-semibold m-3">
              Create your account
            </p>
            <div className="flex flex-col sm:flex-row justify-between w-full">
              <div className="mr-1">
              <Input
                label="First Name"
                placeholder="Enter your First Name"
                type="text"
                name="firstName"
                value={firstName}
                onChange={onInputChangeHandler}
              />
              </div>
              <Input
                label="Last Name"
                placeholder="Enter your Last Name"
                type="text"
                name="lastName"
                value={lastName}
                onChange={onInputChangeHandler}
              />
            </div>
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
              placeholder="Create a Password"
              type="password"
              name="password"
              value={password}
              onChange={onInputChangeHandler}
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm your Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onInputChangeHandler}
            />
            <p className="font-light text-sm text-zinc-600">
              *Password must be at least 6 characters
            </p>
            <Button isLoading={loading} text="Sign Up" type="submit" />
            <p className="font-light text-sm text-zinc-600 text-center mt-4">
              By signing up you agree to our{" "}
              <Link
                to="/privacy-policy"
                className="text-black font-bold underline"
              >
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
