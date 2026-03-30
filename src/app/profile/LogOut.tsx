"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function LogOut() {
    const router = useRouter()
    async function signOut() {
        const { error: singOutErr } = await supabaseClient.auth.signOut()
        if (singOutErr) {
            console.log('error sign Out : ' + singOutErr)
            return
        }
        router.push('/SignIn')
    }
    return (
        <button onClick={signOut} className="btn btn-danger">
            Sign Out
        </button>
    )
}
