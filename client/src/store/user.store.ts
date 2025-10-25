import { create } from "zustand";
import type { userProp } from "../interfaces";

type userStoreType = {
    user: userProp | null
    setUser: (userData: userProp | null) => void
}

const useUserStore = create<userStoreType>((set) => ({
    user: null,
    setUser: (userData) => {
        set({ user: userData })
    }
}))

export default useUserStore