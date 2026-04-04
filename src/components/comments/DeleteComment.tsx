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
        window.location.reload()
    }
    return (
        <button onClick={handleDelete} className="btn btn-danger" id="button-delete">Delete</button>
    )
}
