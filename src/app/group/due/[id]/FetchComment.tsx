import { useState, useEffect } from 'react'
import { supabaseClient } from '@/lib/supabaseClient'
import { getCommentsTodos } from '@/lib/comment/getComments'
import SetActionComment from '@/components/comments/SetActionComment'
import StartComment from '@/components/comments/StartComment'

export default function FetchComment({ todoId }: { todoId: number }) {
    const [comments, setComments] = useState<any[]>([])
    const [show, setShow] = useState<boolean>(false)
    const [count, setCount] = useState<number>(0)

    const FetchComment = async () => {
        const data = await getCommentsTodos(todoId, null)
        if (!data) {
            console.log("Error Fetching data")
            return
        }
        setComments(data)
    }

    const checkCommentCount = async () => {
        const { count, error } = await supabaseClient
            .from("todos_comment")
            .select("id", { count: "exact", head: true })
            .eq("id_todos", todoId)
            .is("id_parent_comment", null)

        if (!error) setCount(count ?? 0)
    }

    const handleShow = async () => {
        if (!show && comments.length === 0) {
            await FetchComment()
        }
        setShow(!show)
    }

    useEffect(() => {
        checkCommentCount()
    }, [todoId])

    return (
        <div>
            <StartComment todo_id={todoId} />
            <button onClick={() => handleShow()} id='Show-btn' className='dropdown-reply'>
                {show ? "Hide Comment" : `Show Comment (${count})`}</button>
            <div className={show ? "block" : "hidden"} id='Comment'>
                <ul>
                    {comments.length > 0 ?
                        comments.map((comment) => (
                            <li key={comment.id} className="comment">
                                <h4>{comment.user_profiles.email_user}</h4>
                                <p>{comment.comment}</p>
                                <SetActionComment email_data={comment.user_profiles.email_user}  id_comment={comment.id} todo_id={todoId} />
                            </li>
                        ))
                        :
                        <p>No comments</p>
                    }
                </ul>
            </div>
        </div>
    )
}
