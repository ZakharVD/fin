import { useEffect, useState } from "react"
import { httpGetCollections } from "../dashboard/services/api"
import Sidebar from "../dashboard/components/sidebar"
import MobileNavbar from "../dashboard/components/MobileNavbar"
import { useDispatch, useSelector } from "react-redux"
import { setCollections } from "../../store/collections/collections.reducer"
import { selectCollections } from "../../store/collections/collections.selector"
import CollectionItem from "../dashboard/components/collectionItem"
import LoadingBlock from "../../components/ui/loadingBlock"
import AddNewCollectionButton from "./components/addNewCollectionBtn"
import { useModal } from "../../hooks/useModal"
import emptyContent from "../../assets/empty-content.svg"
import { useNavigate } from "react-router-dom"
import { selectCurrentUser } from "../../store/user/user.selector"

export default function CollectionsPage() {
  const [loading, setLoading] = useState(true)
  const {showModal} = useModal()
  const dispatch = useDispatch()
  const collections = useSelector(selectCollections)
  const user = useSelector(selectCurrentUser)
  const redirect = useNavigate()

  useEffect(() => {
    if (user === null) {
      console.log("unauthorized")
      redirect("/")
      return
    }
  }, [user])

  useEffect(() => {
    httpGetCollections().then((res) =>
      res
        .json()
        .then((data) => dispatch(setCollections(data)))
        .finally(() => setLoading(false))
    )
  }, [showModal])

  return (
    <div className="flex flex-col sm:flex-row">
      <Sidebar />
      <MobileNavbar />
      <section className="h-screen w-full p-5 overflow-scroll">
        <div className="w-full flex justify-between items-center mb-4">
          <p className="font-medium text-2xl">Your collections:</p>
          <AddNewCollectionButton/>
        </div>
        <div className="flex flex-col h-full">
          {loading ? (
            <div>
              {Array.from({ length: 6 }).map((_, index) => (
                  <LoadingBlock marginBottom={4} key={index} />
                ))}
            </div>
          ) : (
            <>
              {collections.length < 1 ? (
                <div className="flex flex-col sm:flex-row justify-center items-center h-full">
                  <div className="mb-4 sm:mb-0">
                    <img src={emptyContent} alt="" className="w-52 h-52"/>
                  </div>
                  <div>
                    <p className="text-lg">Start by creating a new collection.</p>
                  </div>
                </div>
              ) : (
                <>
                  {collections.map((col) => {
                    return (
                      <CollectionItem
                        key={col.id}
                        collectionName={col.collectionName}
                        collectionId={col.id}
                      />
                    )
                  })}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
