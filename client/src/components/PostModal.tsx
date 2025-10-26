import { X } from "lucide-react"
import { createPortal } from "react-dom"
import usePostStore from "../store/post.store"
import { useState, type FormEvent } from "react"

const PostModal = ({ setShowModal }: { setShowModal: (openState: boolean) => void }) => {
    const main = document.getElementById("main")

    const { addPost } = usePostStore();

    const [url, setUrl] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const formattedTags = tags ? tags.split(",").map(tag => tag.trim()) : []
        try {
            await addPost(url, formattedTags)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            setUrl("");
            setTags("");
            setShowModal(false)
        }
    }

    if (!main) return

    return createPortal(
        <div className="absolute w-full h-screen bg-zinc-950/60 flex justify-center items-center">
            <div className="w-108 bg-zinc-950 text-white rounded-xl shadow shadow-zinc-600/80 p-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Add New Item</h1>
                    <button onClick={() => setShowModal(false)} className="p-1 rounded-full hover:bg-teal-950 transition-all duration-300 cursor-pointer">
                        <X size={20} className="text-grass-500" />
                    </button>
                </div>

                <div className="">
                    <form onSubmit={onSubmit} method="POST" className="mt-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium" htmlFor="url">URL</label>
                            <input onChange={(e) => setUrl(e.target.value)} value={url} className="w-full border-2 border-grass-950 px-1.5 py-2 focus:outline-1 outline-grass-800 text-sm rounded-md font-medium" type="text" placeholder="https:///..." />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium" htmlFor="url">Tag</label>
                            <input onChange={(e) => setTags(e.target.value)} value={tags} className="w-full border-2 border-grass-950 px-1.5 py-2 focus:outline-1 outline-grass-800 text-sm rounded-md font-medium" type="text" placeholder="Enter Tag (Comma Separated)" />
                        </div>

                        <div className="flex justify-end items-center gap-3">
                            <button onClick={() => setShowModal(false)} className="py-1.5 px-3 rounded-md text-sm font-medium hover:bg-zinc-900 transition-all duration-300 border border-zinc-800 cursor-pointer">Cancel</button>
                            <button disabled={loading} className="py-2 px-4 bg-grass-600 rounded-md text-sm font-medium hover:bg-grass-800 cursor-pointer transition-all duration-300 disabled:bg-teal-900">{loading ? "Submitting..." : "Submit"}</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
        , main
    )
}

export default PostModal