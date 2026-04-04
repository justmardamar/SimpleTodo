"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useSessionUser } from "@/lib/useSessionUser"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function page() {
    const { session } = useSessionUser()
    const [chats, setChats] = useState<any[]>([])

    const fetchGroup = async () => {
        const { data, error } = await supabaseClient.from('group_member')
            .select('id,groups(id,name)')
            .eq('id_user', session?.user.id)

        if (error) {
            console.log(error)
            return
        }
        setChats(data)
    }

    useEffect(() => {
        if (!session?.user.email) return
        fetchGroup()
    }, [session?.user.email])

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-card-content">
                    <div className="profile-header">
                        <h1 className="profile-title">Daftar Obrolan Grup</h1>
                        <p className="profile-subtitle">Masuk ke ruang obrolan grup Anda</p>
                    </div>

                    <div className="dashboard-section">
                        <ul className="dashboard-section flex flex-col gap-4" style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                            {chats.length > 0 ? chats.map((chat) => (
                                <li className="group-item-card" key={chat.id}>
                                    <div className="group-item-header">
                                        <h5 className="group-item-name">{chat.groups.name}</h5>
                                    </div>
                                    <div className="group-item-actions">
                                        <Link href={`/chat/${chat.groups.id}`} className="btn btn-primary btn-sm">Mulai Chat</Link>
                                    </div>
                                </li>
                            )) : (
                                <li className="group-empty-state">Belum ada obrolan grup</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
