import { ChangeEvent, useEffect, useState } from "react"
import MobileNavbar from "../dashboard/components/MobileNavbar"
import Sidebar from "../dashboard/components/sidebar"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"
import { useNavigate } from "react-router-dom"
import SettingBtn from "./components/button"
import SettingHeading from "./components/heading"
import { useModal } from "../../hooks/useModal"
import DeleteAccountModal from "./components/deleteAccountModal"
import EditEmailModal from "./components/editEmailModal"
import { useAlert } from "../../hooks/useAlert"
import { alertMessages, alertOptions } from "../../constants/alertOptions.enum"
import { isOnlyLetters } from "../../helpers/isLettersOnly"
import { httpUpdateProfile, httpUploadFile } from "./services/api"
import { formatInput } from "../../helpers/formatInpur"
import { setCurrentUser } from "../../store/user/user.reducer"
import deleteIcon from "../../assets/delete.png"
import DeletePhotoModal from "./components/deletePhotoModal"

export default function UserSettingsPage() {
  const user = useSelector(selectCurrentUser)
  const [firstNameInput, setFirstNameInput] = useState(user?.firstName)
  const [lastNameInput, setLastNameInput] = useState(user?.lastName)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const redirect = useNavigate()
  const { activateModal } = useModal()
  const { activateAlert } = useAlert()
  const dispatch = useDispatch()
  useEffect(() => {
    if (user === null) {
      console.log("unauthorized")
      redirect("/")
      return
    }
  }, [user])

  function onFirstNameInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFirstNameInput(event.target.value)
  }

  function onLastNameInputChange(event: ChangeEvent<HTMLInputElement>) {
    setLastNameInput(event.target.value)
  }

  async function onEditProfileHandler() {
    // validate
    if (firstNameInput?.length === 0 || lastNameInput?.length === 0) {
      activateAlert(alertMessages.emtpyFields, alertOptions.red)
      return
    }
    if (
      (firstNameInput !== undefined && firstNameInput?.length > 15) ||
      (lastNameInput !== undefined && lastNameInput?.length > 15)
    ) {
      activateAlert(alertMessages.tooManySymbols, alertOptions.red)
      return
    }
    if (
      isOnlyLetters(firstNameInput!) === false ||
      isOnlyLetters(lastNameInput!) === false
    ) {
      activateAlert(alertMessages.invalidSymbols, alertOptions.red)
      return
    }
    // format values
    const formattedFirstName = formatInput(firstNameInput!)
    const formattedLastName = formatInput(lastNameInput!)
    try {
      const res = await httpUpdateProfile(formattedFirstName, formattedLastName)
      if (res.ok) {
        const data = await res.json()
        dispatch(setCurrentUser(data))
        activateAlert(alertMessages.profileUpdated, alertOptions.green)
      } else {
        throw Error
      }
    } catch (err) {
      console.log(err)
      activateAlert(alertMessages.error, alertOptions.red)
    }
    if (selectedFile) {
      try {
        const res = await httpUploadFile(selectedFile)
        const data = await res.json()
        if (res.ok) {
          dispatch(setCurrentUser(data))
          activateAlert(alertMessages.profileUpdated, alertOptions.green)
        } else {
          throw Error
        }
      } catch (err) {
        activateAlert(alertMessages.error, alertOptions.red)
      }
    }
  }

  function onEditEmailHandler() {
    activateModal(<EditEmailModal />)
    return
  }

  function onDeleteAccountHandler() {
    activateModal(<DeleteAccountModal />)
    return
  }

  function onDeleteImageHandler() {
    activateModal(<DeletePhotoModal />)
    return
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]

    if (file) {
      setSelectedFile(file)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <Sidebar />
      <MobileNavbar />
      <section className="bg-white h-screen w-full pt-5 pl-8">
        <p className="font-medium text-2xl mb-3">Settings</p>
        <div className="h-auto">
          <SettingHeading text="My Profile" />
          <div className=" max-w-[350px] h-auto flex flex-row py-2">
            <div className="w-[30%] flex flex-col justify-center items-center relative">
              {selectedFile?.type.startsWith("image") ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected File"
                  className="rounded-full h-24 w-24"
                />
              ) : (
                <>
                  {user?.haveProfileImage === true ? (
                    <img
                      src={`https://finlio-bucket.s3.amazonaws.com/uploads/${user?.id}/profile-photo`}
                      alt=""
                      className="w-24 h-24 rounded-full"
                    />
                  ) : (
                    <div className="rounded-full h-24 w-24 mt-3 bg-background border-[1px] shadow-sm flex justify-center items-center">
                      <span className="text-3xl font-medium opacity-70">
                        {user?.firstName[0]}
                      </span>
                    </div>
                  )}
                </>
              )}
              <label
                htmlFor="fileinput"
                className="text-sm opacity-70 mt-1 hover:underline cursor-pointer"
              >
                Change
              </label>
              <input
                type="file"
                id="fileinput"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={handleFileChange}
              />
              {user?.haveProfileImage === true && (
                <div
                  className="flex justify-center items-center absolute bg-background p-1 bottom-6 right-2 rouded-sm border-[1px] hover:border-gray-400 cursor-pointer"
                  onClick={onDeleteImageHandler}
                >
                  <img src={deleteIcon} alt="" className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="w-[70%] ml-5">
              <div>
                <label className="text-sm opacity-70">First Name</label>
                <input
                  type="text"
                  className="bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none w-full text-sm"
                  defaultValue={user?.firstName}
                  onChange={onFirstNameInputChange}
                />
              </div>
              <div>
                <label className="text-sm opacity-70">Last Name</label>
                <input
                  type="text"
                  className="bg-background p-1 rounded-sm border-[1px] focus:border-gray-400 focus:outline-none w-full text-sm"
                  defaultValue={user?.lastName}
                  onChange={onLastNameInputChange}
                />
              </div>
            </div>
          </div>
          <div className="py-3 w-[200px]">
            <SettingBtn actionFn={onEditProfileHandler} text="Save changes" />
          </div>
        </div>
        <div className="h-auto">
          <SettingHeading text="Account" />
          <div className="py-5">
            <p className="">Email</p>
            <p className="text-sm opacity-70">{user?.email}</p>
          </div>
          <div className="pb-3 w-auto">
            <SettingBtn
              actionFn={onEditEmailHandler}
              text="Update email address"
            />
          </div>
        </div>
        <div className="h-32">
          <SettingHeading text="Danger Zone" />
          <div className="py-5 w-[200px]">
            <SettingBtn
              actionFn={onDeleteAccountHandler}
              customStyle="text-red-500 hover:border-red-500 border-red-500 hover:bg-red-100"
              text="Delete my account"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
