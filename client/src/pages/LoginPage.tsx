import { LoaderCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/auth.store'
import toast, { Toaster } from 'react-hot-toast'

const LoginPage = () => {
    const navigate = useNavigate()

    const { login } = useAuthStore()

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true);
            await login(email, password);
            setLoading(true);
            navigate('/dashboard')
        } catch (error) {
            console.log(error);
            toast.error((error as Error).message || "Invalid Credentials", { duration: 1000 })
            navigate('/login')
        } finally {
            setLoading(false);
            setEmail("")
            setPassword("")
        }

    }


    return (
        <div className="w-96 rounded-xl bg-grass-950/20 py-6 px-6 mt-3">
            <Toaster />
            <h1 className="text-xl font-bold ">Welcome Back </h1>
            <form onSubmit={onLogin} className="flex flex-col gap-4 mt-3">

                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="focus:outline-2 outline-grass-500 border w-full p-2 text-sm font-medium rounded-md border-grass-950 placeholder:text-grass-950" placeholder="Enter Email" />

                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="focus:outline-2 outline-grass-500 border w-full p-2 text-sm font-medium rounded-md border-grass-950 placeholder:text-grass-950" placeholder="Enter Password" />

                <button disabled={loading} className="w-full bg-grass-600 p-2 rounded-md text-white font-semibold tracking-tight cursor-pointer hover:bg-grass-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-grass-950/80">
                    {loading &&
                        <LoaderCircle className="animate-spin" />
                    }
                    Login
                </button>
            </form>
            <p className="text-sm mt-3 text-zinc-400 font-medium">Don't have an Account? <Link to={'/register'} className="font-bold text-grass-100 hover:text-grass-400 transition-all duration-300">Register</Link></p>
        </div >
    )
}

export default LoginPage