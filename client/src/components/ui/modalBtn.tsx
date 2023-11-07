import ButtonSpinner from "./buttonLoading"

type Props = {
  actionFn: () => void | Promise<void>
  text: string
  customStyle?: string
  loading?: boolean
}

export default function ModalBtn({
  actionFn,
  text,
  customStyle,
  loading,
}: Props) {
  return (
    <button
      onClick={actionFn}
      className={`w-full font-normal text-white border-[1px] border-transparent bg-black rounded-md hover:opacity-80 ${loading ? "px-0 py-1" : "p-2"} ${customStyle}`}
    >
      {loading ? <ButtonSpinner/> : <>{text}</>}
    </button>
  )
}
