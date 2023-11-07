import { createPortal } from "react-dom"
import { useModal } from "../hooks/useModal"

export default function Modal() {
  const { showModal, content } = useModal()

  return createPortal(
      <div
        className={`w-full h-full top-0 fixed flex justify-center items-center transition-all duration-100 ease-in-out ${
          showModal ? "bg-black bg-opacity-50 z-10" : "opacity-0 -z-50"
        }`}
      >
        {content}
      </div>,
    document.querySelector("#modal") as Element
  )
}
