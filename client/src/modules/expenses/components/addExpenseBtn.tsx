import { useParams } from "react-router-dom"
import AddExpenseModal from "./addExpenseModal"
import { useModal } from "../../../hooks/useModal"



export default function AddExpenseButton() {
  const {activateModal } = useModal()
  const { collectionId } = useParams()

  function onClickHandler() {
    activateModal(<AddExpenseModal collectionId={collectionId!}/>)
    return
  }

  return (
        <button
          onClick={onClickHandler}
          className="p-2 text-sm bg-blue hover:bg-blue-hover text-white rounded-md"
        >
          + Add expense
        </button>
  )
}
