import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth.store"
import useUserStore from "../store/user.store";


const ProtectedRoute = () => {

    const { isAuthenticated } = useAuthStore();
    const { user } = useUserStore();

    if (!isAuthenticated || !user) {
        return <Navigate to={'/login'} state={{ from: location }} />
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute