type Props = {
  text: string
  isLastColumn?: boolean
}

export default function TableCol({text, isLastColumn = false}: Props) {
  const borderClass = isLastColumn ? "" : "border-r-[1px]";

    return (
      <div className={`w-[25%] text-center p-2 flex justify-center ${borderClass}`}>
        <p className="">{text}</p>
      </div>
    )
  }