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
        <div className="w-full h-screen flex bg-linear-to-br from-emerald-950 via-black to-zinc-950" id="main">
            <div className="w-fit h-screen sticky top-1">
                <SideBar />
            </div>
            <div className="w-full h-full overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout