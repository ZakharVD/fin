import { useEffect, useState } from "react"
import { httpGetCollections } from "../services/api"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setCollections } from "../../../store/collections/collections.reducer"
import { selectCollections } from "../../../store/collections/collections.selector"
import CollectionItem from "./collectionItem"
import LoadingBlock from "../../../components/ui/loadingBlock"
import arrow from "../../../assets/right-arrow.png"
import AddNewCollectionButton from "../../collections/components/addNewCollectionBtn"
import emptyContent from "../../../assets/empty-content.svg"

export default function CollectionSection() {
  const [loading, setLoading] = useState(true)
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const collections = useSelector(selectCollections)

  useEffect(() => {
    httpGetCollections().then((res) =>
      res
        .json()
        .then((data) => dispatch(setCollections(data)))
        .finally(() => setLoading(false))
    )
  }, [])

  function onSeeAllHandler() {
    redirect("collections")
    return
  }

  function renderCollections() {
    if (collections.length === 0) {
      return (
        <div className="flex justify-center mt-10">
          <div className="mr-3">
            <img src={emptyContent} alt="" className="w-32 h-32" />
          </div>
          <div className="flex justify-center items-center">
            <p className="text-center align-middle">
              Start by creating a new collection.
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col">
          {collections.length < 3
            ? collections.map((col) => (
                <CollectionItem
                  key={col.id}
                  collectionName={col.collectionName}
                  collectionId={col.id}
                />
              ))
            : collections
                .slice(0, 3)
                .map((col) => (
                  <CollectionItem
                    key={col.id}
                    collectionName={col.collectionName}
                    collectionId={col.id}
                  />
                ))}
          {collections.length > 3 && (
            <div className="w-full flex justify-center">
              <button
                onClick={onSeeAllHandler}
                className="bg-black text-white rounded-md p-2 w-32"
              >
                <div className="flex flex-fol justify-center items-center">
                  <p className="mr-2">See all</p>
                  <img src={arrow} alt="" className="w-3 h-3" />
                </div>
              </button>
            </div>
          )}
        </div>
      )
    }
  }

  return (
    <>
      <div className="h-auto sm:h-1/2 lg:h-[60%] p-4">
        <div className="bg-white p-4 h-full rounded-md border-[1px] shadow-sm relative">
          <div className="w-full flex justify-between items-center mb-4">
            <p className="font-medium text-lg sm:text-2xl">Your collections:</p>
            <AddNewCollectionButton />
          </div>
          <div className="h-full">
            {loading ? (
              <div className="w-full h-full">
                {Array.from({ length: 3 }).map((_, index) => (
                  <LoadingBlock marginBottom={4} key={index} />
                ))}
              </div>
            ) : (
              renderCollections()
            )}
          </div>
        </div>
      </div>
    </>
  )
}
