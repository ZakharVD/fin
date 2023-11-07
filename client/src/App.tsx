import { Route, Routes } from "react-router-dom"
import LandingPage from "./modules/landing"
import LoginPage from "./modules/login"
import RegisterPage from "./modules/register"
import DashboardPage from "./modules/dashboard"
import UserSettingsPage from "./modules/settings"
import CollectionsPage from "./modules/collections"
import ExpensesPage from "./modules/expenses"
import Alert from "./components/alert"
import Modal from "./components/modal"
import PrivacyPolicyPage from "./modules/landing/components/privacyPolicy"


function App() {
  return (
    <>
      <Alert />
      <Modal/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/settings" element={<UserSettingsPage/>}/>
        <Route path="/dashboard/collections" element={<CollectionsPage/>}/>
        <Route path="/dashboard/collections/:collectionId" element={<ExpensesPage/>}/>
      </Routes>
    </>
  )
}

export default App
