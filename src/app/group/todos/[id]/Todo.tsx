import { useState,useEffect } from "react"
import { TodosDo } from "@/types/Todos"
import { useSessionUser } from "@/lib/useSessionUser"
import { useParams } from "next/navigation"
import { format } from "date-fns/format"
import { useRouter } from "next/navigation"
import { CreateTodos } from "@/lib/todos/CreateTodos"

export default function Todo(props : {inputdate : Date}) {

    const router = useRouter()
    const {session} = useSessionUser()
    const {id} = useParams<{id : string}>()

    const [data,setData] = useState<TodosDo>({title : '',
                                            notes : '',
                                            deadline : format(props.inputdate,"yyyy-MM-dd"),
                                            email_user : "",
                                            group_id:"",
                                            user_id:"",
                                            status : "incomplete",
                                            priorities_id : ""
                                          })
    
    useEffect(() => {
      if (!session?.user.email) return 
      if (session?.user.email) {
        setData((prev) => ({
          ...prev,
          email_user: String(session?.user.email),
          user_id : String(session?.user.id),
          group_id : id
        }))
      }
    }, [session?.user.email])

    const handleTodos = async (e : any) => {
        e.preventDefault()
        if(data.priorities_id === "") return

        let insertData = await CreateTodos({dataList : data})

        setData({
          title : '',
          notes:'',
          deadline:format(props.inputdate,"yyyy-MM-dd"),
          email_user: "",
          group_id:"",
          user_id:"",
          status : "incomplete",
          priorities_id : ""
        })

        if(insertData){
          router.push('/group') 
        }
    }

    return (
        <div>
            <form onSubmit={handleTodos} className="flex flex-col ">
                <input type="text" placeholder="title" className="p-2 m-4 border-2" onChange={(e) => setData((prev) => ({...prev,title : e.target.value}))}/>
                <input type="text" placeholder="notes" className="p-2 m-4 border-2" onChange={(e) => setData((prev) => ({...prev,notes : e.target.value}))}/>
                <select name="" id="" className="p-2 m-4 border-2" onChange={(e) => setData((prev) => ({...prev,priorities_id : e.target.value}))}>
                  <option value="">None</option>
                  <option value="1">Urgent</option>
                  <option value="3">Moderate</option>
                  <option value="4">Small</option>
                  <option value="2">Optional</option>
                </select>
                <button type="submit" className="button" >Create</button>
            </form>
        </div>
    )
}
