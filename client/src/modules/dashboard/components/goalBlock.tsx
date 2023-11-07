import goalIcon from "../../../assets/target.png"
import plusIcon from "../../../assets/plus-white.png"
import editIcon from "../../../assets/edit.png"
import { useModal } from "../../../hooks/useModal"
import AddGoalModal from "./addGoalModal"
import CreateGoalModal from "./CreateGoalModal"
import { useSelector } from "react-redux"
import { selectGoal } from "../../../store/goals/goals.selector"
import { formatCurrency } from "../../../helpers/formatCurrency"

export default function GoalBlock() {
  const { activateModal } = useModal()
  const goal = useSelector(selectGoal)

  function onAddHandler() {
    activateModal(<AddGoalModal />)
  }

  function onCreateHandler() {
    activateModal(<CreateGoalModal />)
  }

  const goalAmountFormatted = formatCurrency(goal.amount)
  const goalTargerFormatted = formatCurrency(goal.targetAmount)
  const percentToGoal = String(Math.round(goal.amount / goal.targetAmount * 100))

  return (
    <div className="w-full sm:w-[65%] h-full mb-4 sm:mb-0 p-5 flex flex-col justify-between rounded-md relative shadow-sm bg-blue">
      <div>
        <div className="absolute bottom-3 right-3 flex flex-row">
          {goal.targetAmount === 0 ? (
            <div
              onClick={onCreateHandler}
              className="bg-gray-600 p-2 opacity-40 text-white rounded-sm hover:opacity-60 cursor-pointer"
            >
              <img src={plusIcon} alt="" className="w-4 h-4" />
            </div>
          ) : (
            <>
              <div
                onClick={onCreateHandler}
                className="bg-gray-600 p-2 opacity-40 text-white rounded-sm hover:opacity-60 cursor-pointer mr-2"
              >
                <img src={editIcon} alt="" className="w-4 h-4" />
              </div>
              <div
                onClick={onAddHandler}
                className="bg-gray-600 p-2 opacity-40 text-white rounded-sm hover:opacity-60 cursor-pointer"
                title="Contribute"
              >
                <img src={plusIcon} alt="" className="w-4 h-4" />
              </div>
            </>
          )}
        </div>
        <div className="mb-2">
          <img src={goalIcon} alt="" className="w-9 h-9" />
        </div>
        <p className="text-lg md:text-xl text-white font-medium lg:mb-5">
          Current goal:
          <span className="font-extralight text-lg md:text-xl">
            {" "}
            {goal.name}
          </span>
        </p>
        {goal.amount === 0 && goal.targetAmount === 0 ? (
          <p className="font-extralight text-2xl md:text-2xl text-white">
            Set your first goal!
          </p>
        ) : (
          <p className="font-extralight text-xl md:text-2xl text-white">
            {`${goalAmountFormatted} of ${goalTargerFormatted} (${percentToGoal}%)`}
          </p>
        )}
      </div>
    </div>
  )
}
