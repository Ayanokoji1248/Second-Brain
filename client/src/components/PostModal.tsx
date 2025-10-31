import { X, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";
import usePostStore from "../store/post.store";
import { useState, type FormEvent } from "react";

const PostModal = ({ setShowModal }: { setShowModal: (openState: boolean) => void }) => {
    const main = document.getElementById("main");
    const { addPost } = usePostStore();

    const [url, setUrl] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formattedTags = tags ? tags.split(",").map((tag) => tag.trim()) : [];
        try {
            await addPost(url, formattedTags);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setUrl("");
            setTags("");
            setShowModal(false);
        }
    };

    if (!main) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            {/* Modal container */}
            <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-lg shadow-emerald-900/30 relative animate-fadeIn">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-emerald-200 tracking-tight">Add New Item</h1>
                    <button
                        onClick={() => setShowModal(false)}
                        className="p-2 rounded-full hover:bg-emerald-950/50 transition-all duration-300"
                    >
                        <X size={20} className="text-emerald-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} method="POST" className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="url" className="text-sm font-medium text-emerald-300">
                            URL
                        </label>
                        <input
                            id="url"
                            onChange={(e) => setUrl(e.target.value)}
                            value={url}
                            className="w-full px-3 py-2 bg-zinc-950/40 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                            type="text"
                            placeholder="https://example.com/..."
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="tags" className="text-sm font-medium text-emerald-300">
                            Tags (comma separated)
                        </label>
                        <input
                            id="tags"
                            onChange={(e) => setTags(e.target.value)}
                            value={tags}
                            className="w-full px-3 py-2 bg-zinc-950/40 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                            type="text"
                            placeholder="react, ui, animation"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300 disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" /> Submitting...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        main
    );
};

export default PostModal;
