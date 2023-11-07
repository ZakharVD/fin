import { useNavigate } from "react-router-dom"
import { formatCollectionDate } from "../../../helpers/formatCollectionDate"
import { useState } from "react"
import { useModal } from "../../../hooks/useModal"
import DeleteCollectionModal from "../../collections/components/deleteCollectionModal"
import deleteIcon from "../../../assets/delete.png"

type Props = {
  collectionName: string
  collectionId: string
}

export default function CollectionItem({
  collectionName,
  collectionId,
}: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const { activateModal } = useModal()
  const redirect = useNavigate()
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  function onDeleteHandler() {
    activateModal(
      <DeleteCollectionModal
        collectionId={collectionId}
        collectionName={collectionName}
      />
    )
  }
  function onClickHandler() {
    redirect(`/dashboard/collections/${collectionId}`)
    return
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full mb-3 text-center hover:bg-background relative"
    >
      <div
        onClick={onClickHandler}
        className="p-4 rounded-md border-[1px] shadow-sm cursor-pointer"
      >
        {formatCollectionDate(collectionName)}
      </div>
      <div
        onClick={onDeleteHandler}
        className={`absolute right-3 p-[2px] top-3 hover:bg-gray-200 rounded-sm cursor-pointer border-[1px] border-transparent hover:border-gray-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <img src={deleteIcon} alt="" className="w-6 h-6"/>
      </div>
    </div>
  )
}

