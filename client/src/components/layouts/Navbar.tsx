import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { selectCurrentUser } from "../../store/user/user.selector"

export default function Navbar() {
  const redirect = useNavigate()
  const user = useSelector(selectCurrentUser)

  function onSigninHandler() {
    redirect("/login")
    return
  }

  function onSignupHandler() {
    redirect("/register")
    return
  }

  function onContinueHandler() {
    redirect("/dashboard")
    return
  }

  return (
    <>
      <nav className="flex flex-row justify-between py-4 px-3 sm:px-10">
        <Link to={"/"} className="flex justify-center items-center">
          <span className="text-4xl font-logo font-semibold">
            Finlio<span className="text-[#ff6884]">.</span>
          </span>
        </Link>
        {user === null ? (
          <div>
          <button
            className="py-3 px-5 mr-2 border-[1px] border-transparent rounded-xl"
            onClick={onSigninHandler}
          >
            Sign In
          </button>
          <button
            className="py-3 px-5 border-2 border-transparent bg-black text-white rounded-md hover:opacity-80"
            onClick={onSignupHandler}
          >
            Get Started
          </button>
        </div>
        ) : (
          <button className="py-3 px-5 border-2 border-transparent bg-black text-white rounded-md hover:opacity-80" onClick={onContinueHandler}>Continue to dashboard</button>
        )}
      </nav>
    </>
  )
}
