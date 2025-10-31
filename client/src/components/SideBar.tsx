import { Brain, LayoutDashboard, Twitter, Youtube } from "lucide-react"
import { NavLink } from "react-router-dom"
import useAuthStore from "../store/auth.store"

const SideBar = () => {

    const { logout } = useAuthStore();

    return (
        <div className="h-full flex flex-col items-center justify-between text-white border border-zinc-800 p-5">
            <div className="absolute top-0 right-0 h-full w-0.5 bg-linear-to-b from-zinc-600 via-grass-900 to-zinc-950 rounded-full" />

            <div className="flex flex-col items-center gap-8">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-900/90 rounded-xl">
                        <Brain size={30} className="text-emerald-200" />
                    </div>
                    <h1 className="text-3xl font-bold hidden lg:flex">Second Brain</h1>
                </div>

                <div className="mt-5 flex flex-col gap-3 justify-start py-3 w-full">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `p-2 rounded-xl flex items-center gap-3 px-4 transition-all duration-300 
       ${isActive
                                ? "bg-green-900/30 backdrop-blur-md border border-green-800/40 shadow-md"
                                : "hover:bg-green-900/20 hover:backdrop-blur-sm "}`
                        }
                    >
                        <LayoutDashboard className="text-emerald-200" />
                        <h1 className="text-xl font-medium hidden lg:flex text-emerald-200">
                            Dashboard
                        </h1>
                    </NavLink>

                    <NavLink
                        to="/videos"
                        className={({ isActive }) =>
                            `p-2 rounded-xl flex items-center gap-3 px-4 transition-all duration-300 
       ${isActive
                                ? "bg-green-900/30 backdrop-blur-md border border-green-800/40 shadow-md"
                                : "hover:bg-green-900/20 hover:backdrop-blur-sm "}`
                        }
                    >
                        <Youtube className="text-emerald-200" />
                        <h1 className="text-xl font-medium hidden lg:flex text-emerald-200">
                            Videos
                        </h1>
                    </NavLink>

                    <NavLink
                        to="/tweets"
                        className={({ isActive }) =>
                            `p-2 rounded-xl flex items-center gap-3 px-4 transition-all duration-300 
       ${isActive
                                ? "bg-green-900/30 backdrop-blur-md border border-green-800/40 shadow-md"
                                : "hover:bg-green-900/20 hover:backdrop-blur-sm "}`
                        }
                    >
                        <Twitter className="text-emerald-200" />
                        <h1 className="text-xl font-medium hidden lg:flex text-emerald-200">
                            Tweets
                        </h1>
                    </NavLink>
                </div>

            </div>

            <div className="w-full p-3">
                <button onClick={logout} className="w-full hover:bg-red-950/50 border border-zinc-900 p-2 text-base font-medium text-red-500 rounded-md transition-all duration-300 cursor-pointer">Logout</button>
            </div>

        </div>
    )
}

export default SideBar