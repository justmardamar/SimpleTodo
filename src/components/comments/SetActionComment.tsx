import { useSessionUser } from "@/lib/useSessionUser"
import EditComment from "./EditComment"
import DeleteComment from "./DeleteComment"
import ReplysComments from "./ReplysComments"
import FetchReplys from "@/app/group/due/[id]/FetchReplys"

export default function SetActionComment({email_data,id_comment,todo_id}: {email_data: string,id_comment: number,todo_id: number}) {
    const {session} = useSessionUser()

    return (
        <div>
            {email_data == session?.user.email ?
                <div className="flex flex-row">
                    <EditComment commentId={id_comment} />
                    <DeleteComment commentId={id_comment} />
                </div>
                :
                <ReplysComments commentId={id_comment} todo_id={todo_id} />
            }
            <FetchReplys todoId={todo_id} parrentId={id_comment} />
        </div>
    )
}
