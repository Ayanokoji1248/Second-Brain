import { useState, useEffect, useRef } from "react";
import { FileSymlink, MoreVertical, Share2, Trash2 } from "lucide-react";
import type { postProp } from "../interfaces";

const PostCard = (post: postProp) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-zinc-950 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-zinc-800 relative">

            {/* ⋮ Ellipsis Button */}
            <div className="absolute top-2 right-2 z-20" ref={menuRef}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen((prev) => !prev);
                    }}
                    className="p-1 rounded-full bg-zinc-900/50 transition-colors duration-300"
                >
                    <MoreVertical size={18} className="text-white" />
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden">
                        <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                            onClick={() => {
                                navigator.clipboard.writeText(post.url);
                                setMenuOpen(false);
                            }}
                        >
                            <Share2 size={14} /> Share
                        </button>
                        <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-zinc-800"
                            onClick={() => {
                                console.log("Delete clicked for:", post._id);
                                setMenuOpen(false);
                            }}
                        >
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Thumbnail with type/duration */}
            <div className="relative">
                <img
                    src={post.thumbnail || "/placeholder.svg"}
                    alt={post.title || "Thumbnail"}
                    className="w-full h-48 object-cover"
                />
                {post.type && (
                    <span
                        className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full uppercase font-semibold ${post.type === "YouTube"
                            ? "bg-red-500"
                            : post.type === "X (formerly Twitter)"
                                ? "bg-sky-500"
                                : "bg-teal-500"
                            }`}
                    >
                        {post.type}
                    </span>
                )}
            </div>

            {/* Card content */}
            <div className="p-4 flex flex-col gap-3">
                {post.title && (
                    <h2 className="text-white font-bold text-lg line-clamp-3 leading-tight">
                        {post.title}
                    </h2>
                )}

                {post.description && (
                    <p className="text-sm text-zinc-400">
                        {post.description.substring(0, 100)}
                    </p>
                )}

                {post.type === "X (formerly Twitter)" && (
                    <div
                        className="text-sm text-zinc-500"
                        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                    />
                )}

                {(post.tags || []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">

                        {post.tags?.map((tag, index) => (
                            (index < 3 &&
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-zinc-900 rounded-md text-xs text-zinc-400 font-medium"
                                >
                                    {tag}
                                </span>
                            )
                        ))}
                    </div>
                )}

                <div className="mt-2">
                    <a
                        className="flex items-center gap-2 hover:bg-zinc-900 border border-zinc-900 transition-all duration-300 text-sm w-fit px-3 py-1.5 text-zinc-200 rounded-md"
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FileSymlink size={20} /> Open Original
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
