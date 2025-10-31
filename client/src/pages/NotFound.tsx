import { ArrowLeft, Ghost } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-emerald-900 via-black to-zinc-950 text-white relative overflow-hidden px-6">

            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]" />

            {/* Ghost Icon */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="p-6 bg-emerald-900/30 rounded-full shadow-lg shadow-emerald-900/40">
                    <Ghost size={80} className="text-emerald-300 animate-pulse" />
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-emerald-100 tracking-tight">
                    404
                </h1>
                <p className="text-emerald-400/80 text-lg md:text-xl max-w-md leading-relaxed">
                    Oops! The page you’re looking for doesn’t exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-emerald-700/30"
                >
                    <ArrowLeft size={20} />
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
