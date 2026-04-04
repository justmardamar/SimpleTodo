"use client"

import { useSessionUser } from "@/lib/useSessionUser"
import { useState } from "react"
import { SendChatGroup } from "@/lib/chat/SendChat"

export default function SendChat({group_id} : {group_id : string}) {
    const [text, setText] = useState('')
    const { session } = useSessionUser()

    const sendChat = async (e: any) => {
        e.preventDefault()
        
        if (!session?.user?.id || !text.trim() ) return;

        const { error } = await SendChatGroup({
            group_id, 
            text, 
            user_id: session.user.id
        })

        if (error) {
            console.error("Gagal mengirim pesan:", error)
            return
        }
        
        setText('')
    }

    return (
        <div className="chat-input-area">
            <form onSubmit={sendChat} className="chat-input-form">
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Type your message..." 
                    className="chat-input-field"
                    required
                />
                <button 
                    type="submit" 
                    className="btn btn-primary rounded-full px-6"
                >
                    Kirim
                </button>
            </form>
        </div>
    )
}