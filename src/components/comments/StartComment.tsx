import { supabaseClient } from "@/lib/supabaseClient"
import { useSessionUser } from "@/lib/useSessionUser"
import { useState } from "react"

export default function StartComment({todo_id} : {todo_id:number}) {

    const { session } = useSessionUser()
    const [comment, setComment] = useState<string>("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!comment){
            alert("Comment tidak boleh kosong")
            return
        }
        const { error } = await supabaseClient.from("todos_comment")
            .insert({
                comment: comment,
                id_todos: todo_id,
                id_user: session?.user.id
            })
    
        if (error) {
            console.log(error)
            return
        }
        setComment("")
        window.location.reload()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="comment" placeholder="Comment" className="input-comment" onChange={(e) => setComment(e.target.value)} />
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}
