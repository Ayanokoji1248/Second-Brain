import { Share2, Trash2 } from 'lucide-react';
import type { postProp } from '../interfaces';
import usePostStore from '../store/post.store';
import toast from 'react-hot-toast';

type postMenuModalType = {
    setMenuOpen: (menuState: boolean) => void
    post: postProp
}

const PostMenuModal = ({ setMenuOpen, post }: postMenuModalType) => {

    const { deletePost } = usePostStore();

    return (
        <div className="absolute right-0 mt-2 w-32 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden">
            <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                onClick={() => {
                    navigator.clipboard.writeText(post.url);
                    toast.success("Link Copied Successfully")
                    setMenuOpen(false);
                }}
            >
                <Share2 size={14} /> Share
            </button>
            <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-zinc-800"
                onClick={() => {
                    console.log("Delete clicked for:", post._id);
                    deletePost(post._id)
                    setMenuOpen(false);
                }}
            >
                <Trash2 size={14} /> Delete
            </button>
        </div>
    )
}

export default PostMenuModal