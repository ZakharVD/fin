import { TExpense } from "../../../types/expenses.types"
import TableHead from "./tableHead"
import TableRow from "./tableRow"
import emptyContent from "../../../assets/empty-content.svg"

type Props = {
  data: [] | TExpense[]
}

export default function Table({ data }: Props) {
  return (
    <>
      {data.length < 1 ? (
        <>
          <table className="w-full">
            <TableHead />
          </table>
          <div className="w-full flex-col sm:flex-row flex justify-center items-center mt-6 sm:mt-16">
            <div className="mb-5 sm:mb-0">
              <img
                src={emptyContent}
                alt=""
                className="w-36 h-36 sm:w-44 sm:h-44"
              />
            </div>
            <div>
              <p>Add your first expense.</p>
            </div>
          </div>
        </>
      ) : (
        <table className="w-full shadow-sm overflow-scroll">
          <TableHead />
          <tbody>
            {data.map((ex) => (
              <TableRow
                key={ex.id}
                id={ex.id}
                amount={ex.amount}
                label={ex.label}
                day={ex.day}
                description={ex.description}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
