import CloseModalBtn from "../../../components/ui/closeModalBtn"
import ModalBtn from "../../../components/ui/modalBtn"
import { useModal } from "../../../hooks/useModal"

export default function CashFlowModal() {
  const { deactivateModal } = useModal()

  function onCancelHandler() {
    deactivateModal()
    return
  }
  return (
    <div
      className={`w-[300px] h-[200px] bg-white rounded-md shadow-md p-4 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
    >
        <CloseModalBtn />
      <div className="text-center mb-2">
        <p>Cash flow is calculated based on your overall income and expenses.</p>
      </div>
      <div className="flex flex-col justify-between">
        <ModalBtn text="Cancel" actionFn={onCancelHandler}/>
      </div>
    </div>
  )
}
