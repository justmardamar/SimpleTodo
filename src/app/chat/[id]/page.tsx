"use client"

import { useParams } from "next/navigation"
import LoadChat from "./LoadChat"
import SendChat from "./SendChat"

export default function ChatPage() {
    const {id} = useParams<{id: string}>()
    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-card-content p-0 sm:p-0"> 
                    <div className="profile-header text-center pt-8 mb-4">
                        <h1 className="profile-title">Group Discussion</h1>
                        <p className="profile-subtitle">Diskusikan tugas dan ide bersama anggota tim</p>
                    </div>
                    
                    <div className="chat-wrapper">
                        <LoadChat group_id={id} />
                        <SendChat group_id={id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

