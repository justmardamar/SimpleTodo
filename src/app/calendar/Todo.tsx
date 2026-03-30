import { supabaseClient } from "@/lib/supabaseClient"
import { useState,useEffect } from "react"
import { Todos } from "@/types/Todos"
import { useSessionUser } from "@/lib/useSessionUser"

export default function Todo(props : {inputdate : Date}) {

    const {session} = useSessionUser()

    const [data,setData] = useState<Todos>({title : '',notes : '',priorites : '', deadline : props.inputdate,email_user : "",status:"incomplete",done_at:null})
    
    useEffect(() => {
      if (!session?.user.email) return 
      if (session?.user.email) {
        setData((prev) => ({
          ...prev,
          email_user: String(session?.user.email)
        }))
      }
    }, [session?.user.email])

    const handleTodos = async (e : any) => {
        e.preventDefault()
        const {error} = await supabaseClient.from('todos').insert(data).single()
        if(error){
            console.log(error)
        }
        setData({title : '',notes:'',priorites:'',deadline:props.inputdate,email_user: "",status:"incomplete",done_at:null})
    }

    return (
        <div>
            <form onSubmit={handleTodos} className="flex flex-col ">
                <input type="text" placeholder="title" className="p-2 m-4 border-2" onChange={(e) => setData((prev) => ({...prev,title : e.target.value}))}/>
                <input type="text" placeholder="notes" className="p-2 m-4 border-2" onChange={(e) => setData((prev) => ({...prev,notes : e.target.value}))}/>
                <input type="text" placeholder="priorites" className="p-2 m-4 border-2" onChange={(e) => setData((prev) => ({...prev,priorites:e.target.value}))}/>
                <button type="submit" className="border p-2">Create</button>
            </form>
        </div>
    )
}
