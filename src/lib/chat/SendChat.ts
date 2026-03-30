import { supabaseClient } from "../supabaseClient";

export async function SendChatGroup({ group_id, text, user_id }: { group_id: string, text: string, user_id: string }) {
    const { error } = await supabaseClient.from('group_chat')
        .insert({
            group_id,
            text,
            user_id
        })
        .select()
        .single()

    return { error }
}