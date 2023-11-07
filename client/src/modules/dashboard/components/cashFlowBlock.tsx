import LoadingBlock from "../../../components/ui/loadingBlock"
import { formatCurrency } from "../../../helpers/formatCurrency"
import infoIcon from "../../../assets/info-white.png"
import cashFlowIcon from "../../../assets/cash-flow-black.png"
import { useModal } from "../../../hooks/useModal"
import CashFlowModal from "./cashFlowModal"

type Props = {
  loading: boolean
  totalCashFlow: number
}

export default function CashFlowBlock({ loading, totalCashFlow }: Props) {
  const { activateModal } = useModal()

    function onGetInfoClick() {
        activateModal(<CashFlowModal/>)
    }

    const totalCashFlowFormatted = formatCurrency(totalCashFlow)

  return (
    <div
      className={`sm:w-[32%] h-[30%] sm:h-auto rounded-md border-[1px] shadow-sm p-5 relative font-medium bg-white`}
    >
      <div className="w-full flex justify-between flex-col ">
        <div
          className="absolute bottom-3 right-3 p-2 bg-gray-600 opacity-30 rounded-sm hover:opacity-50 cursor-pointer"
          title="Contribute"
          onClick={onGetInfoClick}
        >
          <img src={infoIcon} alt="" className="w-4 h-4" />
        </div>
        <div className="w-full mb-2">
          <img src={cashFlowIcon} alt="" className="w-9 h-9" />
        </div>
        <p className="text-lg md:text-xl lg:mb-5">
          Total cash flow:
        </p>
        {loading ? (
          <div className="">
            <LoadingBlock />
          </div>
        ) : (
          <div className="font-extralight text-xl md:text-2xl">
            {totalCashFlowFormatted}
          </div>
        )}
      </div>
    </div>
  )
}
