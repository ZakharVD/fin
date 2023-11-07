import { PathMatch } from "react-router-dom"

type Props = {
  text: string
  windowWidth: number
  icon: string
  active?: PathMatch<string> | null
  handlerFunc: () => void
}

export default function SidebarItem({ text, icon, windowWidth, active = null, handlerFunc }: Props) {
  return (
    <button onClick={handlerFunc} className={`text-sm font-medium text-black hover:bg-background py-2 w-[95%] mx-auto rounded-sm my-1 flex justify-around items-center ${active !== null ? "bg-background" : ""}`}>
      {windowWidth >= 1024 || windowWidth < 640 ? (
        <div className={`flex flex-row justify-between`}>
          <img src={icon} alt="" className={`w-5 h-5 mr-5`}/>
          <span>{text}</span>
        </div>
      ) : (
        <img src={icon} alt="" className="w-6 h-6"/>
      )}
    </button>
  )
}
