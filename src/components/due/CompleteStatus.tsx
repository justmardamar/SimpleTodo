"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useParams, useRouter } from "next/navigation"

export default function CompleteStatus({id}: {id : string}) {
    const router = useRouter()
    const setStatusCompleteTask = async () => {
        const {data : todos} = await supabaseClient.from("todos").select("status").eq("id",id).single()
        if(todos?.status == "complete"){
            alert("Task ini sudah selesai")
            return
        }
        
        const confirm = window.confirm("Apakah anda yakin ingin menyelesaikan task ini?")
        if(!confirm){
            return
        }
        const {error} = await supabaseClient.from("todos")
        .update({status : "complete"})
        .eq("id",id)

        if(error){
            console.log(error)
            return
        }
        router.push(`/group`)
    }

    return (
        <div>
            <button onClick={() => setStatusCompleteTask()} className="btn btn-primary">Task telah selesai</button>
        </div>
    )
}
