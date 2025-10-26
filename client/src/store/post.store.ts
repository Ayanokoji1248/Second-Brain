import { create } from "zustand";
import type { postProp } from "../interfaces";
import { BACKEND_URL } from "../lib";
import axios from "axios";

type postStoreType = {
    posts: postProp[],
    fetchPosts: () => Promise<void>
    addPost: (url: string, tags: string[]) => Promise<void>
}

const usePostStore = create<postStoreType>((set) => ({
    posts: [],
    fetchPosts: async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/post/all`, { withCredentials: true });
            console.log(response.data);
            set({ posts: response.data.posts.reverse() });
        } catch (error) {
            console.error(error);
        }
    },
    addPost: async (url, tags) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/post/create`, {
                url,
                tags
            }, { withCredentials: true });

            console.log(response.data);
            const newPost = response.data.post

            set((state) => ({
                posts: [newPost, ...state.posts]
            }))

        } catch (error) {
            console.error(error);
        }
    }
}))

export default usePostStore;