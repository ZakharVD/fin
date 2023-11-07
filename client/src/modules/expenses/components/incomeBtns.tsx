import { useSelector } from "react-redux"
import editIcon from "../../../assets/edit.png"
import plusIcon from "../../../assets/plus-white.png"
import { useModal } from "../../../hooks/useModal"
import AddIncomeModal from "./addIncomeModal"
import EditIncomeModal from "./editIncomeModal"
import { selectIncome } from "../../../store/income/income.selector"

export default function IncomeButtons({collectionId}: {collectionId: string}) {
  const {activateModal} = useModal()
  const { amount } = useSelector(selectIncome)

  function onAddHandler() {
    activateModal(<AddIncomeModal collectionId={collectionId}/>)
  }

  function onEditHandler() {
    activateModal(<EditIncomeModal />)
  }

  return (
    <div className="absolute bottom-3 right-3 flex flex-row z-10">
      <div onClick={onEditHandler} className={`bg-gray-500 p-2 opacity-30 text-white rounded-sm hover:opacity-60 cursor-pointer mr-2 ${amount === 0 ? "hidden" : ""}`}>
        <img src={editIcon} alt="" className="w-4 h-4" />
      </div>
      <div
        onClick={onAddHandler}
        className="bg-gray-500 p-2 opacity-30 text-white rounded-sm hover:opacity-60 cursor-pointer"
        title="Contribute"
      >
        <img src={plusIcon} alt="" className="w-4 h-4" />
      </div>
    </div>
  )
}
