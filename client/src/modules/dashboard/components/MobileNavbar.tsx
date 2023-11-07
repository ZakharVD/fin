import { useEffect, useState } from "react"
import menu from "../../../assets/menu.png"
import SidebarItem from "./sedebarItem"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import dashboardIcon from "../../../assets/dashboard.png"
import insightsIcon from "../../../assets/insight.png"
import settingsIcon from "../../../assets/setting-white.png"
import logoutIcon from "../../../assets/logout.png"
import { selectCurrentUser } from "../../../store/user/user.selector"
import ProfileBlock from "./profileBlock"
import { useModal } from "../../../hooks/useModal"
import LogoutModal from "./logoutModal"

export default function MobileNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  function onToggle() {
    setIsSidebarOpen((prev) => !prev)
  }
  return (
    <div className="flex sm:hidden flex-row w-[90%] mx-auto py-4">
      <div className="w-full flex flex-row justify-between items-center">
        <img src={menu} alt="" className="w-5 h-5 cursor-pointer" onClick={onToggle} />
        <p className="font-logo font-semibold text-3xl">Finlio<span className="text-[#ff6884]">.</span></p>
      </div>
      <MobileSidebar isOpen={isSidebarOpen} />
    </div>
  )
}

function MobileSidebar({ isOpen }: { isOpen: boolean }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const user = useSelector(selectCurrentUser)
  const {activateModal} = useModal()
  const redirect = useNavigate()
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  function onDashbordHandler() {
    redirect("/dashboard")
    return
  }

  function onTrackingHandler() {
    redirect("/dashboard/collections")
    return
  }

  function onSettingsHandler() {
    redirect("/dashboard/settings")
    return
  }

  function onLogoutHandler() {
    activateModal(<LogoutModal />)
  }

  return (
    <div
      className={`absolute flex sm:hidden h-[95vh] w-screen bg-background transition-all duration-200 ease-linear top-16 z-30 ${
        isOpen ? "left-0 opacity-100" : "left-[-100vw] opacity-0"
      }`}
    >
      <div className="h-full w-full flex flex-col justify-between">
        <div className="flex flex-col justify-center mt-5">
        <ProfileBlock user={user}/>
          <SidebarItem
            handlerFunc={onDashbordHandler}
            icon={dashboardIcon}
            windowWidth={windowWidth}
            text="Dashboard"
          />
          <SidebarItem
            handlerFunc={onTrackingHandler}
            icon={insightsIcon}
            windowWidth={windowWidth}
            text="Collections"
          />
          <SidebarItem
            handlerFunc={onSettingsHandler}
            icon={settingsIcon}
            windowWidth={windowWidth}
            text="Settings"
          />
        </div>
        <div className="flex justify-center mb-10">
          <SidebarItem
            handlerFunc={onLogoutHandler}
            icon={logoutIcon}
            windowWidth={windowWidth}
            text="Logout"
          />
        </div>
      </div>
    </div>
  )
}
