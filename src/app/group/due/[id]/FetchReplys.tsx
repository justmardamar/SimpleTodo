import { supabaseClient } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"
import ReplysComments from "../../../../components/comments/ReplysComments"
import { getCommentsTodos } from "@/lib/comment/getComments"
import SetActionComment from "@/components/comments/SetActionComment"

export default function FetchReplys({ parrentId, todoId }: { parrentId: number, todoId: number }) {
    const [replies, setReplies] = useState<any[]>([])
    const [show, setShow] = useState(false)
    const [count, setCount] = useState<number>(0)

    const checkReplyCount = async () => {
        const { count, error } = await supabaseClient
            .from("todos_comment")
            .select("id", { count: "exact", head: true })
            .eq("id_parent_comment", parrentId)

        if (!error) setCount(count ?? 0)
    }

    const fetchReplies = async () => {
        const data = await getCommentsTodos(todoId, parrentId)
        if (!data) return
        setReplies(data)
    }

    const handleToggle = async () => {
        if (!show && replies.length === 0) {
            await fetchReplies()
        }
        setShow(!show)
    }

    useEffect(() => {
        checkReplyCount()
    }, [parrentId])

    if (count === 0) return null

    return (
        <div className="ml-6 mt-2">
            <button
                onClick={handleToggle}
                className="dropdown-reply"
            >
                {show ? "Hide replies" : `Show replies (${count})`}
            </button>

            {show && (
                <ul className="mt-2">
                    {replies.map((reply) => (
                        <li key={reply.id} className="border-l pl-3 mb-2">
                            <strong>{reply.user_profiles.email_user}</strong>
                            <p>{reply.comment}</p>
                            <SetActionComment email_data={reply.user_profiles.email_user} id_comment={reply.id} todo_id={reply.id_todos} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
