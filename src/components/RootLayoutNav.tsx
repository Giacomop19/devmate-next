"use client"
import { signOut, useSession } from "next-auth/react"

const RootLayoutNav = () => {
    const { data : session } = useSession()

    return (
        <nav className="flex justify-between items-center py-4">
            <a href="/">Home</a>
            {session && 
                <button onClick={() => signOut()} className="ml-auto">Logout</button> 
            }
        </nav>
    )
}

export default RootLayoutNav;