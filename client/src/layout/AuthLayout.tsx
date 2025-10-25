import { Brain } from "lucide-react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex flex-col items-center justify-start pt-15 gap-5 w-full h-screen bg-linear-to-br from-emerald-900 via-black to-grass-950 text-white" >

            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="p-2 bg-green-900/90 rounded-xl">
                    <Brain size={30} className="text-emerald-200" />
                </div>
                <h1 className="text-3xl font-bold">Second Brain</h1>
            </div>

            {/* Heading */}
            <div className="w-108 flex flex-col items-center justify-center text-center gap-4">
                <h1 className="text-4xl font-bold">Organize Your Digital Knowledge</h1>
                <p className="text-grass-500 leading-tight">Save and organize all your valuable resources in one powerful platform.</p>
            </div>


            <Outlet />


        </div>


    );
};

export default AuthLayout;
