"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useState } from "react"
import Link from "next/link"

export default function FormSignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { error: signUpError } = await supabaseClient.auth.signUp({ email, password })
        if (signUpError) {
            console.log("Sign Up error" + signUpError)
            return
        }
        alert('Email Verifikasi telah terkirim')
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Sign Up</h1>
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
                    <button type="submit" className="auth-button">Sign Up</button>
                </form>
                <div className="auth-footer">
                    Already have an account?
                    <Link href={'/SignIn'} className="auth-link">Sign In</Link>
                </div>
            </div>
        </div>
    )
}
