"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useSessionUser } from "@/lib/useSessionUser"
import { useEffect, useState } from "react"

export default function TodosMessage() {
    
    const { session } = useSessionUser()
    const [todos, setTodos] = useState<any[]>([])
    const fetchOverDue = async () => {
        const {data , error} = await supabaseClient.from("todos")
        .select("id,title,notes,deadline,status,created_at")
        .eq("user_id",session?.user.id)
        .eq("status","incomplete")
        .lt("deadline",new Date().toISOString())
        .order("deadline",{ascending:true})
        
        if(error){
            console.log(error)
            return
        }
        console.log(data)
        setTodos(data)
    }

    useEffect(() => {
        fetchOverDue()
    }, [session?.user.id])

    return (
        <div>
            <ul>
                {todos.length > 0 ?
                    todos.map((todo) => (
                        <li key={todo.id} className="messegeLi">
                            <h5 className="font-black text-lg">{todo.title}</h5>
                            <p className="text-sm">{todo.deadline}</p>
                            <p className="text-sm">{todo.status}</p>
                            <span className="text-sm">{todo.created_at}</span>
                            <p>The current todos has overDue</p>
                        </li>
                    ))
                    :
                    <p>Tidak ada Todos yang overdue</p>
                }
            </ul>
        </div>
    )
}
