"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useParams } from "next/navigation"
import { useState } from "react"
import { CreateUserGroup } from "@/lib/users/CreateUser"

export default function page() {
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const { id } = useParams<{ id: string }>()

    const handleMember = async (e: any) => {
        e.preventDefault()

        if (!email || !role) return alert("Email dan Role harus diisi")

        const { data: userProfile, error } = await supabaseClient.from('user_profiles')
            .select('id,email_user')
            .eq('email_user', email)
            .single()

        if (error || !userProfile) return alert('User Tidak Ditemukan')

        const { data: existingMember } = await supabaseClient
            .from('group_member')
            .select('id')
            .match({ group_id: id, id_user: userProfile.id })
            .single()

        if (existingMember) return alert("User sudah ada di group ini")

        const addUser = await CreateUserGroup({
            groupId: id,
            userId: userProfile.id,
            emailUser: userProfile.email_user,
            roleId: Number(role)
        })

        if (addUser) {
            alert("User berhasil ditambahkan")
            setEmail("")
        }
    }

    return (
        <div>
            <h1>Tambahkan Anggota Ke dalama group</h1>
            <div className="flex content-center justify-center">
                <form onSubmit={handleMember}>
                    <input type="text" placeholder="Email User" name="email" className="input-add" onChange={(e) => setEmail(e.target.value)} />
                    <select name="role" className="input-add" onChange={(e) => setRole(e.target.value)}>
                        <option value="">None</option>
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                    </select>
                    <button type="submit" className="btn btn-primary">Tambahkan</button>
                </form>
            </div>
        </div>
    )
}
