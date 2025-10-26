import { PlusCircle, Search } from "lucide-react"
import { useState } from "react"
import PostModal from "../components/PostModal"
import PostCard from "../components/PostCard";
import usePostStore from "../store/post.store";

const VideoPage = () => {

    const { posts } = usePostStore();

    const [showModal, setShowModal] = useState(false)

    const filterPost = posts.filter((post) => post.type.toLowerCase() === "youtube")

    return (
        <div className='bg-zinc-950 w-full min-h-screen text-white p-5'>

            {showModal &&
                <PostModal setShowModal={setShowModal} />
            }

            <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-bold'>Saved Videos</h1>
                    <p className='text-sm text-zinc-400 font-medium'>Manage your saved videos</p>
                </div>

                <button onClick={() => setShowModal(true)} className='p-2 bg-grass-700 font-medium rounded-md flex gap-2 items-center hover:bg-grass-800 transition-all duration-300 cursor-pointer'><PlusCircle size={20} />
                    <span>Add Item</span>
                </button>
            </div>

            <div className='mt-8'>

                <div className="w-fit flex items-center gap-2 pl-2 border border-grass-900 rounded-md focus-within:ring-1 focus-within:ring-grass-950">
                    <Search size={20} className='text-grass-500' />
                    <input
                        className="w-72 md:w-96 p-1.5 py-2 text-sm outline-none rounded-md"
                        type="text"
                        placeholder="Search by title, tag, or content ..."
                    />
                </div>

                {posts.length == 0 &&
                    <div className='mt-5'>
                        <p className='text-sm font-medium text-zinc-500 px-2'>No post yet.</p>
                    </div>
                }

                {posts.length > 0 &&
                    <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {filterPost.map((post) => (
                            <PostCard {...post} />
                        ))}

                    </div>
                }

            </div>
        </div>
    )
}

export default VideoPage