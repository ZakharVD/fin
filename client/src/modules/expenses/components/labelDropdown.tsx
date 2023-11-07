import arrowDownIcon from "../../../assets/arrow-down.png"
import { labels } from "../../../constants/labelOptions"
import { renderColor } from "../helpers/renderColors"

type Props = {
  isOpen: boolean
  handleLabelSelect: (label: string) => void
  value: string | undefined
  toggleOpen: () => void
}

export default function LabelDropdown({
  isOpen,
  toggleOpen,
  handleLabelSelect,
  value,
}: Props) {

  const options = Object.entries(labels).map(([option, backgroundColor]) => (
    <div
      className={`cursor-pointer border-[1px] font-light py-1 mb-1 bg-opacity-30 hover:bg-opacity-40 rounded-lg ${backgroundColor}`}
      key={option}
      onClick={() => handleLabelSelect(option)}
    >
      {option}
    </div>
  ))

  return (
    <div
      className="rounded-sm w-full relative cursor-pointer"
      onClick={toggleOpen}
    >
      <div className={`w-full flex flex-row justify-between items-center bg-blue bg-opacity-20 p-1 rounded-lg font-light ${value !== undefined ? renderColor(value) : ""}`}>
        <div className="px-1 overflow-clip">{value === undefined ? "select" : value}</div>
        <div>
          <img src={arrowDownIcon} alt="" className="w-3 h-3 mx-1" />
        </div>
      </div>
      {isOpen && (
        <div className="absolute -bottom-[285px] -right-5 z-20 w-20 sm:w-36 p-1 bg-white rounded-md text-sm">
          {options}
        </div>
      )}
    </div>
  )
}
