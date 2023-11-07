import ButtonSpinner from "./buttonLoading"

type Props = {
    onClickHandler: () => void |  Promise<void>
    loading: boolean
}

export default function DeleteBtn({onClickHandler, loading}: Props) {
    return (
        <button
          onClick={onClickHandler}
          className={`w-full text-red-500 border-[1px] border-red-500 rounded-md p-2 hover:bg-red-100 ${loading ? "px-0 py-1" : "p-2"}`}
        >
           {loading ? <ButtonSpinner/> : <div>Delete</div>}
        </button>
    )
}