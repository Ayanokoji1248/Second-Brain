import { Link } from "react-router-dom"

const RegisterPage = () => {
    return (
        <div className="w-96 rounded-xl bg-grass-950/20 py-6 px-6 mt-3">
            <h1 className="text-xl font-bold ">Create An Account </h1>
            <form className="flex flex-col gap-4 mt-3">
                <input type="text" className="border w-full p-2 text-sm font-medium outline-none rounded-md border-grass-950 placeholder:text-grass-950" placeholder="Enter Username" />

                <input type="email" className="border w-full p-2 text-sm font-medium outline-none rounded-md border-grass-950 placeholder:text-grass-950" placeholder="Enter Email" />

                <input type="password" className="border w-full p-2 text-sm font-medium outline-none rounded-md border-grass-950 placeholder:text-grass-950" placeholder="Enter Password" />

                <button className="w-full bg-grass-600 p-2 rounded-md text-white font-semibold tracking-tight cursor-pointer hover:bg-grass-800 transition-all duration-300">Create Account</button>
            </form>
            <p className="text-sm mt-3 text-zinc-400 font-medium">Already have an Account? <Link to={'/login'} className="font-bold text-grass-100 hover:text-grass-400 transition-all duration-300">Login</Link></p>
        </div>
    )
}

export default RegisterPage