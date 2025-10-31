import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import AuthLayout from "./layout/AuthLayout"
import MainLayout from "./layout/MainLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import VideoPage from "./pages/VideoPage"
import TwitterPage from "./pages/TwitterPage"
import NotFound from "./pages/NotFound"

const App = () => {


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

      <Route path="*" element={<NotFound />} />

    </Routes>

  )
}

export default App