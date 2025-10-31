import { PlusCircle } from "lucide-react"
import { useState } from "react"
import PostModal from "../components/PostModal"
import PostCard from "../components/PostCard";
import usePostStore from "../store/post.store";
import { Toaster } from "react-hot-toast";

const TwitterPage = () => {
    const { posts } = usePostStore();

    const [showModal, setShowModal] = useState(false)

    const filterPosts = posts.filter((post) => post.type === "X (formerly Twitter)")

    return (
        <main className="w-full min-h-screen bg-zinc-950 text-white p-5 md:p-8">
            <Toaster />

            {showModal && <PostModal setShowModal={setShowModal} />}

            {/* Header */}
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-emerald-100">
                        Tweets
                    </h1>
                    <p className="text-sm text-zinc-400 font-medium">
                        Organize your digital knowledge
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
                >
                    <PlusCircle size={20} />
                    <span>Add Item</span>
                </button>
            </header>

            {/* Posts Section */}
            <section>
                {posts.length === 0 && (
                    <p className="text-sm font-medium text-zinc-500 px-2 mt-8">
                        No posts yet. Start by adding your first one ✨
                    </p>
                )}

                {filterPosts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                        {filterPosts.map((post) => (
                            <PostCard key={post._id} {...post} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}

export default TwitterPage