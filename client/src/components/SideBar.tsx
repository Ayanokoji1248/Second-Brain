import { Brain, LayoutDashboard, Twitter, Youtube, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const SideBar = () => {
    const { logout } = useAuthStore();

    const navItems = [
        { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/videos", icon: Youtube, label: "Videos" },
        { to: "/tweets", icon: Twitter, label: "Tweets" },
    ];

    return (
        <aside className="relative flex flex-col justify-between items-center h-full w-20 md:w-64 bg-zinc-950/80 border-r border-zinc-800 p-4 md:p-5 transition-all duration-300">

            {/* Subtle gradient line on the right edge */}
            <div className="absolute top-0 right-0 h-full w-px bg-linear-to-b from-zinc-600 via-green-900 to-zinc-950" />

            {/* Logo & Navigation */}
            <div className="flex flex-col items-center w-full gap-8">
                {/* Logo */}
                <div className="flex items-center justify-center md:justify-start gap-3">
                    <div className="p-2 bg-green-900/80 rounded-xl shadow-inner">
                        <Brain size={26} className="text-emerald-200" />
                    </div>
                    <h1 className="hidden md:block text-xl font-semibold text-emerald-100">
                        Second Brain
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-3 w-full mt-5">
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-2 rounded-lg transition-all duration-300 
                 ${isActive
                                    ? "bg-green-900/30 border border-green-800/40 backdrop-blur-md shadow-md"
                                    : "hover:bg-green-900/20 hover:backdrop-blur-sm"
                                }`
                            }
                        >
                            <Icon size={22} className="text-emerald-200 shrink-0" />
                            <span className="hidden md:flex text-emerald-100 font-medium text-lg">
                                {label}
                            </span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Logout Button */}
            <button
                onClick={logout}
                className="w-full flex items-center justify-center md:justify-start gap-2 px-2 md:px-4 py-2 rounded-lg text-red-500 border border-red-900/40 hover:bg-red-950/40 transition-all duration-300 font-medium text-sm md:text-base"
            >
                <LogOut size={20} className="shrink-0" />
                <span className="hidden md:inline">Logout</span>
            </button>
        </aside>
    );
};

export default SideBar;
