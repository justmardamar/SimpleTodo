"use client"
import { supabaseClient } from "@/lib/supabaseClient"

export default function DeleteComment({commentId}: {commentId: number}) {
    const handleDelete = async () => {
        const { error } = await supabaseClient.from("todos_comment")
        .delete()
        .eq("id", commentId)

        if(error){
            console.log(error)
            return
        }
    }
    return (
        <button onClick={handleDelete} className="button" id="button-delete">Delete</button>
    )
}
