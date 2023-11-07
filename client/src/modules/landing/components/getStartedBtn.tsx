import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectCurrentUser } from "../../../store/user/user.selector"

export default function GetStartedBtn() {
  const redirect = useNavigate()
  const user = useSelector(selectCurrentUser)
  function onGetStartedHanler() {
    if (user === null) {
      redirect("/register")
      return
    } else {
      redirect("/dashboard")
      return
    }
  }
  return (
    <button
      onClick={onGetStartedHanler}
      className="py-5 phone:py-4 px-7 border-2 border-transparent bg-black text-white rounded-md w-full hover:opacity-80"
    >
      Get Started
    </button>
  )
}
