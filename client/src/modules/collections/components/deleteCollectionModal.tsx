import { useDispatch } from "react-redux"
import CloseModalBtn from "../../../components/ui/closeModalBtn"
import { alertMessages, alertOptions } from "../../../constants/alertOptions.enum"
import { formatCollectionDate } from "../../../helpers/formatCollectionDate"
import { useAlert } from "../../../hooks/useAlert"
import { useModal } from "../../../hooks/useModal"
import { httpDeleteCollection } from "../services/api"
import { setCollections } from "../../../store/collections/collections.reducer"
import { useState } from "react"
import { setStatistics } from "../../../store/statistics/statistics.reducer"
import DeleteBtn from "../../../components/ui/deleteBtn"


type Props = {
  collectionName: string
  collectionId: string
}

export default function DeleteCollectionModal({
  collectionName,
  collectionId,
}: Props) {
  const [loading, setLoading] = useState(false)
  const { deactivateModal } = useModal()
  const {activateAlert} = useAlert()
  const dispatch = useDispatch()
  
  async function onDeleteHandler() {
    try {
      setLoading(true)
      const res = await httpDeleteCollection(collectionId)
      const data = await res.json()
      if (res.ok) {
        dispatch(setCollections(data.collections))
        dispatch(setStatistics(data.statistics))
        setLoading(false)
        deactivateModal()
        activateAlert(alertMessages.collectionDeleted, alertOptions.green)
      }
    } catch(err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <div
      className={`w-[300px] h-[170px] bg-white rounded-md shadow-md p-4 flex flex-col justify-between text-black transition-all duration-400 ease-in-out`}
    >
        <CloseModalBtn />
      <div className="text-center mb-2">
        <p>Are you sure you want to delete {formatCollectionDate(collectionName)}{" "}
        collection ?</p>
      </div>
      <div className="flex flex-col justify-between">
        <DeleteBtn onClickHandler={onDeleteHandler} loading={loading}/>
      </div>
    </div>
  )
}
