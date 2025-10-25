import { LoaderCircle } from "lucide-react"
import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import useAuthStore from "../store/auth.store"
import toast, { Toaster } from "react-hot-toast"

const RegisterPage = () => {

    const { register } = useAuthStore();

    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const onRegister = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            await register(username, email, password);

        } catch (error) {
            toast.error((error as Error).message, { duration: 1000 });
        } finally {
            setLoading(false);
            setUsername("")
            setEmail("")
            setPassword("")
        }

    }


    return (
        <div className="w-96 rounded-xl bg-grass-950/20 py-6 px-6 mt-3">

            <Toaster />

            <h1 className="text-xl font-bold ">Create An Account </h1>
            <form onSubmit={onRegister} className="flex flex-col gap-4 mt-3">
                <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className="focus:outline-2 outline-grass-500 border w-full p-2 text-sm font-medium rounded-md border-grass-950 placeholder:text-grass-950" placeholder="Enter Username" />

                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="focus:outline-2 outline-grass-500 border w-full p-2 text-sm font-medium rounded-md border-grass-950 placeholder:text-grass-950" placeholder="Enter Email" />

                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="focus:outline-2 outline-grass-500 border w-full p-2 text-sm font-medium rounded-md border-grass-950 placeholder:text-grass-950" placeholder="Enter Password" />

                <button disabled={loading} className="w-full bg-grass-600 p-2 rounded-md text-white font-semibold tracking-tight cursor-pointer hover:bg-grass-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-grass-950/80">
                    {loading &&
                        <LoaderCircle className="animate-spin" />
                    }
                    Create Account
                </button>
            </form>
            <p className="text-sm mt-3 text-zinc-400 font-medium">Already have an Account? <Link to={'/login'} className="font-bold text-grass-100 hover:text-grass-400 transition-all duration-300">Login</Link></p>
        </div>
    )
}

export default RegisterPage