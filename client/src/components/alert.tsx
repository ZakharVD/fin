import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useAlert } from "../hooks/useAlert"

export default function Alert() {
  const { alertMessage, showAlert, alertType, deactivateAlert } = useAlert()

  useEffect(() => {
    if (showAlert == true) {
      setTimeout(() => {
        deactivateAlert()
      }, 4000)
    }
  }, [deactivateAlert, showAlert])

  return createPortal(
    <div className={`fixed ${showAlert ? "top-6" : "-top-10"} transition-all duration-100 ease-linear left-1/2 transform -translate-x-1/2  w-[95%] h-auto md:w-[500px] z-30`}>
      <div
        className={`${alertType} border-[1px] shadow-lg text-lg w-[95%] h-auto md:w-[500px] mx-auto rounded-md p-4`}
      >
        <div className="flex justify-between items-center">
          <p className="text-md">{alertMessage}</p>
        </div>
      </div>
    </div>,
    document.querySelector("#alert") as Element
  )
}
