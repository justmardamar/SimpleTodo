import { supabaseClient } from "../supabaseClient"

export const getCommentsTodos = async (todoId: number, parrentId: number | null) => {

    let query = supabaseClient.from("todos_comment")
        .select("id,comment,id_user,id_parent_comment ,id_todos, user_profiles (id,email_user)")
        .eq("id_todos", todoId)
        .order("created_at", { ascending: true })

    if (parrentId != null) {
        query = query.eq("id_parent_comment", parrentId)
    } else {
        query = query.is("id_parent_comment", null)
    }

    const { data, error } = await query

    if (error) {
        console.log(error)
        return
    }
    return data
}
