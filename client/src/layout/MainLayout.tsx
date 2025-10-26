import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"
import { useEffect } from "react"
import usePostStore from "../store/post.store"

const MainLayout = () => {

    const { fetchPosts } = usePostStore();

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div className="w-full h-screen flex" id="main">
            <div className="w-[20%] h-screen sticky top-1">
                <SideBar />
            </div>
            <div className="w-[80%] h-full overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout