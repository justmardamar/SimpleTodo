import { supabaseClient } from "../supabaseClient"
import { fetchChat } from "@/types/Chat"
import { Dispatch, SetStateAction } from "react"

export function RealTimeChat(setChat: Dispatch<SetStateAction<fetchChat[]>>) {
    const channel = supabaseClient.channel('group_chat')

    channel.on('postgres_changes', {
        event: "INSERT",
        schema: "public",
        table: "group_chat",
    }, async (payload) => {
        const newMessage = payload.new as any

        const { data: profile } = await supabaseClient
            .from('user_profiles')
            .select('id,email_user')
            .eq('id', newMessage.user_id)
            .single()

        const chatWithProfile: fetchChat = {
            ...newMessage,
            user_profiles: profile
        }

        setChat((prev) => [...prev, chatWithProfile])
        
    }).subscribe((status) => {
        if (status !== 'SUBSCRIBED') return
        console.log('Realtime Connection telah tersambung')
    })

    return channel
}

export async function LoadChatGroup({ group_id }: { group_id: string }) {
    const { data, error } = await supabaseClient.from('group_chat')
        .select('id,user_id,text,created_at, user_profiles (id,email_user)')
        .eq('group_id', group_id)
        .order('created_at', { ascending: true })
    if (error) {
        console.log(error)
        return
    }
    return { data }
}