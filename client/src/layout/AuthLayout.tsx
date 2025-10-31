import { Brain } from "lucide-react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-0 bg-linear-to-br from-emerald-900 via-black to-grass-950 text-white relative py-10">

            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.15),transparent_70%)]" />

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-900/90 rounded-xl shadow-md shadow-emerald-800/30">
                    <Brain size={32} className="text-emerald-200" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Second Brain</h1>
            </div>

            {/* Heading */}
            <div className="text-center max-w-lg mx-auto mb-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-100 mb-3 leading-tight">
                    Organize Your Digital Knowledge
                </h2>
                <p className="text-emerald-400/80 text-sm md:text-base leading-relaxed">
                    Save and structure all your valuable resources — videos, tweets, articles, and notes — in one intelligent hub.
                </p>
            </div>

            {/* Auth Form (child routes) */}
            <div className="z-10 w-full flex justify-center">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
