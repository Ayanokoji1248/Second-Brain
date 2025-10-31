import { Brain, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-emerald-950 via-black to-zinc-950 text-white">
            {/* ===== HEADER ===== */}
            <header className="sticky top-0 z-50 w-full bg-black/40 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-900/90 rounded-xl">
                            <Brain size={28} className="text-emerald-200" />
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold">Second Brain</h1>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate("/login")} className="px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-900 transition-all duration-300">
                            Sign In
                        </button>
                        <button onClick={() => navigate("/register")} className="px-4 py-2 rounded-md text-sm font-medium bg-emerald-700 hover:bg-emerald-800 transition-all duration-300">
                            Get Started
                        </button>
                    </div>
                </div>
            </header>

            {/* ===== MAIN CONTENT ===== */}
            <main className="max-w-7xl mx-auto px-6 md:px-10">

                {/* ===== HERO SECTION ===== */}
                <section className="flex flex-col justify-center items-center text-center py-28 md:py-36 gap-10">
                    <div className="flex items-center px-5 py-2 rounded-full gap-3 border border-emerald-900 bg-emerald-950/50">
                        <Sparkles className="text-emerald-400" size={16} />
                        <p className="text-sm font-semibold text-emerald-400">
                            Introducing Second Brain
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-6 max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-emerald-100">
                            Your Digital Knowledge Hub
                        </h1>
                        <p className="text-emerald-100/80 text-lg leading-relaxed">
                            Save, organize, and instantly retrieve videos, tweets, articles, and notes.
                            Never lose a valuable resource again.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => navigate("/register")} className="px-6 py-2 rounded-md text-sm font-medium bg-emerald-700 hover:bg-emerald-800 transition-all duration-300">
                            Start Free
                        </button>
                        <button onClick={() => navigate("/login")} className="px-6 py-2 rounded-md text-sm font-medium hover:bg-zinc-900 transition-all duration-300">
                            Sign In
                        </button>
                    </div>
                </section>

                {/* ===== FEATURES SECTION ===== */}
                <section className="py-24 border-t border-white/10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-100">
                            Powerful Features
                        </h2>
                        <p className="text-zinc-400 mt-2">
                            Everything you need to organize your digital knowledge
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                        {[
                            {
                                icon: <Play size={30} className="text-emerald-400" />,
                                title: "Save Videos",
                                description:
                                    "Capture and organize YouTube videos and tutorials with automatic metadata extraction.",
                            },
                            {
                                icon: <Play size={30} className="text-emerald-400" />,
                                title: "Smart Collections",
                                description:
                                    "Group your saved videos into topic-based collections for better organization.",
                            },
                            {
                                icon: <Play size={30} className="text-emerald-400" />,
                                title: "Sync Across Devices",
                                description:
                                    "Access your saved videos and playlists from any device seamlessly.",
                            },
                            {
                                icon: <Play size={30} className="text-emerald-400" />,
                                title: "Offline Mode",
                                description:
                                    "Watch your saved tutorials anytime, even without internet connection.",
                            },
                            {
                                icon: <Play size={30} className="text-emerald-400" />,
                                title: "AI Summaries",
                                description:
                                    "Get concise AI-generated summaries and timestamps for long tutorials.",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="w-full max-w-sm rounded-2xl transition-all duration-300 p-6 hover:bg-zinc-900/50 flex flex-col gap-3"
                            >
                                {feature.icon}
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                                    <p className="text-zinc-400 text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== HOW IT WORKS SECTION ===== */}
                <section className="py-24 border-t border-white/10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-emerald-100">
                        How It Works
                    </h2>
                    <p className="text-zinc-400 mb-14">
                        Get started in three simple steps
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            {
                                step: "1",
                                title: "Save Content",
                                description:
                                    "Use our browser extension or paste links directly to save any content.",
                            },
                            {
                                step: "2",
                                title: "Organize",
                                description:
                                    "Create collections, add tags, and write notes to organize your resources.",
                            },
                            {
                                step: "3",
                                title: "Retrieve",
                                description:
                                    "Search instantly across all your saved content with powerful filters.",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center bg-zinc-900/40 p-8 rounded-2xl hover:bg-zinc-900/60 transition-all duration-300"
                            >
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-lg mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-zinc-400 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* ===== FOOTER ===== */}
            <footer className="border-t border-white/10 py-8 text-center text-zinc-500 text-sm">
                <p>
                    © {new Date().getFullYear()} Second Brain — Built with ❤️ by AxelX
                </p>
            </footer>
        </div>
    );
};

export default HomePage;
