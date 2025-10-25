import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth.store"
import useUserStore from "../store/user.store";


const ProtectedRoute = () => {

    const { isAuthenticated } = useAuthStore();
    const { user } = useUserStore();

    if (!isAuthenticated || user == null) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute