import { useEffect, useState } from "react"
import SidebarItem from "./sedebarItem"
import dashboardIcon from "../../../assets/dashboard.png"
import insightsIcon from "../../../assets/insight.png"
import settingsIcon from "../../../assets/setting-white.png"
import logoutIcon from "../../../assets/logout-white.png"
import { useMatch, useNavigate } from "react-router-dom"
import { useModal } from "../../../hooks/useModal"
import LogoutModal from "./logoutModal"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../../store/user/user.selector"
import ProfileBlock from "./profileBlock"

export default function Sidebar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const redirect = useNavigate()
  const { activateModal } = useModal()
  const user = useSelector(selectCurrentUser)

  const isDashboardActive = useMatch("/dashboard")
  const isCollectionActive = useMatch("/dashboard/collections")
  const isSettingsActive = useMatch("/dashboard/settings")

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
    <aside className="hidden sm:flex flex-col h-screen w-28 lg:w-72 bg-white border-r-2">
      <div className="flex justify-center my-5">
        {windowWidth >= 1024 ? (
          <span className="text-4xl font-logo font-semibold">
            Finlio<span className="text-[#ff6884]">.</span>
          </span>
        ) : (
          <span className="text-5xl font-logo font-semibold">
            F<span className="text-[#ff6884]">.</span>
          </span>
        )}
      </div>
      <div className="flex flex-col h-full w-full justify-between">
        <div className="flex flex-col justify-center">
          <ProfileBlock user={user}/>
          <SidebarItem
            active={isDashboardActive}
            handlerFunc={onDashbordHandler}
            icon={dashboardIcon}
            windowWidth={windowWidth}
            text="Dashboard"
          />
          <SidebarItem
            active={isCollectionActive}
            handlerFunc={onTrackingHandler}
            icon={insightsIcon}
            windowWidth={windowWidth}
            text="Collections"
          />
          <SidebarItem
            active={isSettingsActive}
            handlerFunc={onSettingsHandler}
            icon={settingsIcon}
            windowWidth={windowWidth}
            text="Settings"
          />
        </div>
        <div className="flex justify-center mb-5">
          <SidebarItem
            handlerFunc={onLogoutHandler}
            icon={logoutIcon}
            windowWidth={windowWidth}
            text="Logout"
          />
        </div>
      </div>
    </aside>
  )
}
