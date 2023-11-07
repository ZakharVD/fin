import { formatCurrency } from "../../../helpers/formatCurrency"
import { ViewExpenseModal } from "./viewExpenseModal"
import { useModal } from "../../../hooks/useModal"
import { useParams } from "react-router-dom"
import { renderColor } from "../helpers/renderColors"

type Props = {
  id: string
  day: string
  amount: string
  label: string
  description: string
}

export default function TableRow({
  id,
  day,
  amount,
  label,
  description,
}: Props) {
  const {activateModal} = useModal()
  const {collectionId} = useParams()

  function onClickHandler() {
    if (id.length < 1) {
      return
    }
    activateModal(<ViewExpenseModal expenseId={id} collectionId={collectionId!}/>)
  }

  return (
    <>
      <tr
        onClick={onClickHandler}
        key={id}
        className="hover:bg-gray-100 border-y-[1px] font-light cursor-pointer"
      >
        <td className="p-2 text-center border-r-[1px]">{day}</td>
        <td className="p-2 text-center border-r-[1px]">
          {formatCurrency(Number(amount))}
        </td>
        <td className="p-2 text-center border-r-[1px]">{description}</td>
        <td className={`p-2 text-center`}>
          <div className={`text-center flex justify-center items-center overflow-hidden`}>
            <p className={`bg-opacity-20 px-5 rounded-md text-light ${renderColor(label)}`}>{label}</p>
          </div>
        </td>
      </tr>
    </>
  )
}
