import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth.store"
import useUserStore from "../store/user.store";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../lib";
import AIBrain from "../assets/AI Brain.json"



const ProtectedRoute = () => {

    const { isAuthenticated } = useAuthStore();
    const { user } = useUserStore();
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

    if (!isAuthenticated || user == null) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute