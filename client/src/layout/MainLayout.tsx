import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"

const MainLayout = () => {
    return (
        <div className="w-full h-screen flex">
            <SideBar />
            <div className="w-[80%] h-hull">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout