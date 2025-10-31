import { PlusCircle, Search } from 'lucide-react';
import PostModal from '../components/PostModal';
import { useEffect, useState } from 'react';
import usePostStore from '../store/post.store';
import PostCard from '../components/PostCard';
import axios from 'axios';
import { BACKEND_URL } from '../lib';
import { Toaster } from 'react-hot-toast';

const DashboardPage = () => {

    const [showModal, setShowModal] = useState(false)
    const { posts } = usePostStore();
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        if (!query) {
            setSearchResult([])
            setSearchLoading(false)
            return
        }

        const timer = setTimeout(async () => {

            try {
                setSearchLoading(true);
                const response = await axios.get(`${BACKEND_URL}/post/search?q=${query}`, { withCredentials: true });
                setSearchResult(response.data.posts);

            } catch (error) {
                console.error(error)
            } finally {
                setSearchLoading(false);
            }
        }, 500)

        return () => {
            clearTimeout(timer)
        }

    }, [query])


    return (
        <div className='w-full min-h-screen text-white p-5'>

            <Toaster />

            {showModal &&
                <PostModal setShowModal={setShowModal} />
            }

            <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-bold'>Dashboard</h1>
                    <p className='text-sm text-zinc-400 font-medium'>Organize your digital knowledge</p>
                </div>

                <button onClick={() => setShowModal(true)} className='p-2 bg-grass-700 font-medium rounded-md flex gap-2 items-center hover:bg-grass-800 transition-all duration-300 cursor-pointer'><PlusCircle size={20} />
                    <span>Add Item</span>
                </button>
            </div>

            <div className='mt-8'>

                <div className="w-full flex items-center gap-2 pl-2 border border-grass-900 rounded-md focus-within:ring-1 focus-within:ring-grass-950">
                    <Search size={20} className='text-grass-500' />
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        className="w-full p-1.5 py-2 text-sm outline-none rounded-md"
                        type="text"
                        placeholder="Search by title, tag, or content ..."
                    />
                </div>

                {searchLoading &&
                    <p>Loading...</p>
                }

                {posts.length == 0 &&
                    <div className='mt-5'>
                        <p className='text-sm font-medium text-zinc-500 px-2'>No post yet.</p>
                    </div>
                }

                {(query ? searchResult : posts).length > 0 &&
                    <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {(query ? searchResult : posts).map((post) => (
                            <PostCard {...post} />
                        ))}

                    </div>
                }


            </div>
        </div>
    )
}

export default DashboardPage