import closeIcon from "../../assets/close.png"
import { useModal } from "../../hooks/useModal"

export default function CloseModalBtn() {
  const { deactivateModal } = useModal()
  function onCancelHandler() {
    deactivateModal()
    return
  }

  return (
    <div className="flex justify-end items-center">
      <div
        onClick={onCancelHandler}
        className="p-2 hover:bg-gray-100 border-[1px] border-transparent cursor-pointer rounded-sm hover:border-gray-200"
      >
        <img src={closeIcon} alt="" className="h-[14px] w-[14px]" />
      </div>
    </div>
  )
}
