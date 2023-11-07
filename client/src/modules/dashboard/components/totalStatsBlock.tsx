import LoadingBlock from "../../../components/ui/loadingBlock"

type Props = {
  title: string
  amount: string
  loading: boolean
  background?: string
  icon: string
  heaghtAndWidth: string
  options?: JSX.Element
}

export default function StatsBlock({
  title,
  icon,
  amount,
  loading,
  background,
  heaghtAndWidth,
  options = <></>
}: Props) {
  return (
    <div
      className={`sm:w-[32%] h-auto flex items-center sm:items-start rounded-md border-[1px] shadow-sm p-4 font-medium relative mb-4 sm:mb-0 ${background}`}
    >
      {options}
      <div className="h-auto w-full flex justify-between flex-col">
        <div className="w-full mb-2">
          <img src={icon} alt="" className={`${heaghtAndWidth}`} />
        </div>
        <p className="text-lg md:text-xl lg:mb-3 text-white">{title}</p>
        {loading ? (
          <div className="">
            <LoadingBlock />
          </div>
        ) : (
          <div className="font-extralight text-xl md:text-2xl text-white opacity-80">
            {amount}
          </div>
        )}
      </div>
    </div>
  )
}
