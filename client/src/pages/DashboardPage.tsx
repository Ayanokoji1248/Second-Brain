import { PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import PostModal from "../components/PostModal";
import PostCard from "../components/PostCard";
import usePostStore from "../store/post.store";
import { BACKEND_URL } from "../lib";

const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const { posts } = usePostStore();
  const filteredPosts = query ? searchResult : posts;

  useEffect(() => {
    if (!query) {
      setSearchResult([]);
      setSearchLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const response = await axios.get(
          `${BACKEND_URL}/post/search?q=${query}`,
          { withCredentials: true }
        );
        setSearchResult(response.data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white p-5 md:p-8">
      <Toaster />

      {showModal && <PostModal setShowModal={setShowModal} />}

      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-100">
            Dashboard
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

      {/* Search Bar */}
      <div className="relative w-full max-w-2xl mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-emerald-900 rounded-md focus-within:ring-1 focus-within:ring-emerald-600 transition-all duration-300">
          <Search size={18} className="text-emerald-500" />
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
            type="text"
            placeholder="Search by title, tag, or content..."
          />
        </div>

        {searchLoading && (
          <p className="text-xs text-zinc-500 mt-2">Searching...</p>
        )}
      </div>

      {/* Posts Section */}
      <section>
        {posts.length === 0 && !searchLoading && (
          <p className="text-sm font-medium text-zinc-500 px-2 mt-8">
            No posts yet. Start by adding your first one ✨
          </p>
        )}

        {filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;
