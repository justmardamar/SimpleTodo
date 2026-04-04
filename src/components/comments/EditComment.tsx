"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useState } from "react"

export default function EditComment({commentId}: {commentId: number}) {
    const [edit, setEdit] = useState<boolean>(false)
    const [comment, setComment] = useState<string>("")

    const handleComment = async () => {
        const { error } = await supabaseClient.from("todos_comment")
        .update({
            comment : comment
        })
        .eq("id", commentId)

        if(error){
            console.log(error)
            return
        }
        setEdit(false)
        window.location.reload()
    }

    return (
        <div>
            <button onClick={() => setEdit(!edit)} className="btn btn-primary">Edit</button>
            {edit && 
            <form onSubmit={handleComment}>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className="border rounded-xl p-2"/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            }
        </div>
    )
}