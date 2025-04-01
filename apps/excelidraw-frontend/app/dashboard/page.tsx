"use client";

import { removeToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const router = useRouter();

    const handleLogout = () => {
        removeToken();
        router.replace("/signin");
    }

    return (
        <>
            <h1 className="text-xl">Welcomw to Dashboard</h1>
            <div>
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white rounded px-2 py-1"
                >Logout</button>
            </div>
        </>
    )
}