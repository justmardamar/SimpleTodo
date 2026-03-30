import { supabaseClient } from "@/lib/supabaseClient"
import { useSessionUser } from "@/lib/useSessionUser"
import { useState } from "react"

export default function ReplysComments({commentId,todo_id}: {commentId: number,todo_id: number}) {
  const [show,setShow] = useState<boolean>(false)
  const [Reply,setReply] = useState<string>("")
  const {session} = useSessionUser()

  const handleShow = () => {
    setShow(!show)
  }
  const handleSubit = async (e:any) => {
    e.preventDefault()
    const {error} = await supabaseClient.from("todos_comment")
    .insert({
      comment:Reply,
      id_todos: todo_id,
      id_user:session?.user.id,
      id_parent_comment:commentId
    })

    if(error){
      console.log(error)
      return
    }
    setReply("")
    setShow(false)
  }
  return (
    <div>
      <button className="button" onClick={() => handleShow()}>Reply</button>
      <form className={show ? "block" : "hidden"} onSubmit={handleSubit}>
        <input type="text" placeholder="Reply" className="input-comment" onChange={(e) => setReply(e.target.value)} />
        <button className="button" type="submit">Send</button>
      </form>
    </div>
  )
}
