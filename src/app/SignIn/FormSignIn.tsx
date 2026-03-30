"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function FormSignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { error: signInError } = await supabaseClient.auth.signInWithPassword({ email, password })
        if (signInError) {
            console.log("Sign In Error : " + signInError)
            return
        }
        router.push('/')
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Sign In</h1>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="email"
                        placeholder="Email"
                        className="auth-input"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="auth-input"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-button">Sign In</button>
                </form>
                <div className="auth-footer">
                    Don't have an account?
                    <Link href={'/signUp'} className="auth-link">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
