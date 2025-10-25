import axios, { isAxiosError } from "axios";
import { create } from "zustand";
import { BACKEND_URL } from "../lib";
import useUserStore from "./user.store";

type authStoreType = {
    isAuthenticated: boolean,
    setIsAuthenticated: (authData: boolean) => void,
    login: (email: string, password: string) => Promise<void>,
    register: (username: string, email: string, password: string) => Promise<void>,
    logout: () => Promise<void>
}

const useAuthStore = create<authStoreType>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (isAuth: boolean) => {
        set({ isAuthenticated: isAuth })
    },
    login: async (email: string, password: string) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                email,
                password
            }, { withCredentials: true });
            set({ isAuthenticated: true });
            useUserStore.getState().setUser(response.data.user)

        } catch (error) {
            set({ isAuthenticated: false })
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message)
            }
            throw new Error("Invalid Credentials")
        }
    },
    register: async (username, email, password) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/register`, {
                username,
                email,
                password
            }, { withCredentials: true });
            set({ isAuthenticated: true })
            useUserStore.getState().setUser(response.data.user)
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message)
            }
            throw new Error("Registeration Failed")
        }
    },
    logout: async () => {
        await axios.post(`${BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
        set({ isAuthenticated: false });
        useUserStore.getState().setUser(null)
    }

}))

export default useAuthStore;
