import AddCollectionModal from "./addCollectionModal"
import { useModal } from "../../../hooks/useModal"
import { useEffect, useState } from "react"

export default function AddNewCollectionButton() {
    const { activateModal } = useModal()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
      }
      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [])
  
    function onAddCollection() {
     return activateModal(<AddCollectionModal/>)
    }
  
    return (
        <button
          onClick={onAddCollection}
          className="p-2 bg-blue hover:bg-blue-hover text-white rounded-md text-sm"
        >
          {windowWidth < 640 ? "+ Create" : "+ Create collection"}
        </button>
    )
  }