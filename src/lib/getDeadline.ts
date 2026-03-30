import { supabaseClient } from "./supabaseClient"

export async function getDeadlines(group_id : string) {
    const { data, error } = await supabaseClient
        .from("todos")
        .select("deadline")
        .eq('status','incomplete')
        .eq('group_id',group_id)

    if (error) throw error

    return data
        .filter(d => d.deadline)
        .map(d =>
        new Date(d.deadline).toISOString().split("T")[0]
    )
}
