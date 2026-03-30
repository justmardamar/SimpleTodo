"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function page() {
    const [edit,setEdit] = useState("")
    const route = useRouter()

    const updateUsername = async (e:any) => {
        e.preventDefault()
        const { data: { session } } = await supabaseClient.auth.getSession()
        const userId = session?.user.id
        const {error} = await supabaseClient.from('user_profiles').update({username : edit}).eq('id',userId)
        if(error){
            console.log(error)
            return
        }
        setEdit("")
        route.push('/profile')
    }

    return (
        <div>
            <form onSubmit={updateUsername} className="flex flex-col">
                <h1>Edit profile</h1>
                <input type="text" placeholder='Username' onChange={(e) => setEdit(e.target.value)} />
                <button>Edit</button>
            </form>
        </div>
    )
}
