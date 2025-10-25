import { PlusCircle, Search } from 'lucide-react';
import PostModal from '../components/PostModal';
import { useState } from 'react';

const DashboardPage = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <div className='bg-zinc-950 w-full h-full text-white p-5'>

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

                <div className="w-fit flex items-center gap-2 pl-2 border-2 border-grass-700 rounded-md focus-within:ring-1 focus-within:ring-grass-800">
                    <Search size={20} className='text-grass-500' />
                    <input
                        className="w-96 p-1.5 py-2 text-sm outline-none rounded-md"
                        type="text"
                        placeholder="Search by title, tag, or content ..."
                    />
                </div>

                <div className='mt-5'>
                    <p className='text-sm font-medium text-zinc-500 px-2'>No post yet.</p>
                </div>

            </div>
        </div>
    )
}

export default DashboardPage