import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import AuthLayout from "./layout/AuthLayout"
import MainLayout from "./layout/MainLayout"
import { useEffect, useState } from "react"
import useUserStore from "./store/user.store"
import axios from "axios"
import { BACKEND_URL } from "./lib"
import ProtectedRoute from "./components/ProtectedRoute"
import useAuthStore from "./store/auth.store"
import Lottie from "lottie-react"
import AIBrain from "./assets/AI Brain.json"
import VideoPage from "./pages/VideoPage"
import TwitterPage from "./pages/TwitterPage"

const App = () => {

  const { setUser } = useUserStore();
  const { setIsAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/me`, {
          withCredentials: true
        })
        setUser(response.data.user)
        setIsAuthenticated(true)
      } catch (error) {
        console.error(error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [])

  if (loading) {
    return (

      <div className="w-full h-screen bg-zinc-950 flex items-center justify-center text-white">
        <Lottie
          animationData={AIBrain}
          loop={true}
        />
      </div>
    )
  }

  return (

    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/videos" element={<VideoPage />} />
          <Route path="/tweets" element={<TwitterPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>

  )
}

export default App