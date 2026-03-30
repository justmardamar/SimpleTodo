"use client"

import { supabaseClient } from "@/lib/supabaseClient"
import { useEffect, useState, useRef } from "react"
import { fetchChat } from "@/types/Chat"
import { useSessionUser } from "@/lib/useSessionUser"
import { LoadChatGroup, RealTimeChat } from "@/lib/chat/LoadChat"


export default function LoadChat({group_id} : {group_id : string}) {
    const [chat,setChat] = useState<fetchChat[]>([])
    const { session } = useSessionUser()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const setLoadChatGroup = async () => {
        const Chats = await LoadChatGroup({group_id})
        setChat(Chats?.data as any)
    }

    useEffect(() => {
        setLoadChatGroup()
        const channel = RealTimeChat()

        return () => {
            supabaseClient.removeChannel(channel)
        }
    },[group_id])

    useEffect(() => {
        scrollToBottom()
    }, [chat])

    return (
        <div className="chat-messages-area">
            {chat.map((c) => {
                const isOwn = c.user_id === session?.user?.id
                return (
                    <div key={c.id} className={`chat-bubble-container ${isOwn ? 'own' : 'other'}`}>
                        {!isOwn && (
                            <span className="chat-sender-name">{c.user_profiles?.email_user}</span>
                        )}
                        <div className="chat-bubble">
                            {c.text}
                        </div>
                    </div>
                )
            })}
            <div ref={messagesEndRef} />
        </div>
    )
}
