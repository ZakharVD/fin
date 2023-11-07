import arrowDownIcon from "../../../assets/arrow-down.png"

type Props = {
  isOpen: boolean
  handleDaySelect: (day: string) => void
  value: string | undefined
  toggleOpen: () => void
}

export default function DayDropdown({ isOpen, toggleOpen,  handleDaySelect, value }: Props) {
  const options = Array.from({ length: 31 }, (_, index) =>
    (index + 1).toString()
  )
  return (
    <div
      className="bg-background p-1 rounded-sm border-[1px] w-full relative cursor-pointer"
      onClick={toggleOpen}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <div className="px-1 overflow-clip">{value === undefined ? "select" : value}</div>
        <div>
          <img src={arrowDownIcon} alt="" className="w-3 h-3 mx-1" />
        </div>
      </div>
      {isOpen && (
        <div className="absolute -bottom-[305px] -right-3 z-20 w-20 sm:w-28 bg-white rounded-sm max-h-[300px] overflow-scroll">
          {options.map((option) => (
            <div
              className="py-1 cursor-pointer border-[1px] font-normal hover:bg-background"
              key={option}
              onClick={() =>  handleDaySelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
