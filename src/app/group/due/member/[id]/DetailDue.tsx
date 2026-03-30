"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Todos } from "@/types/Todos"
import { useSessionUser } from "@/lib/useSessionUser"
import { useRouter } from "next/navigation"

export default function DetailDue() {
    const router = useRouter()
    const { id } = useParams<{ id: string }>()
    const [todo, setTodo] = useState<Todos | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const { session } = useSessionUser()

    const fetchTodo = async () => {
        const { data, error } = await supabaseClient.from("todos")
            .select("*")
            .eq("id", id)
            .single()

        if (error) {
            console.log(error)
            return
        }

        setTodo(data)
    }

    useEffect(() => {
        fetchTodo()
    }, [id])

    const handleUpload = async (e: any) => {
        e.preventDefault()
        if (!file) {
            return
        }
        const { error } = await supabaseClient.storage.from("todos_file")
            .upload(
                `Todos/${id}/${Date.now()}_${file.name}`,
                file
            )
        const { error: errorAdd } = await supabaseClient.from("todos_member")
            .insert({
                todos_id: id,
                user_id: session?.user.id,
                email_user: session?.user.email
            })
        if (error) {
            alert("File yang didukung adalah pdf")
            return
        }
        if (errorAdd) {
            console.log(errorAdd)
            return
        }
        setFile(null)
        router.push('/group')
    }

    return (
        <div className="border rounded-xl p-4 m-2">
            <h4>Title : {todo?.title}</h4>
            <h6>Priority : {todo?.priorites}</h6>
            <p>{todo?.notes}</p>
            <h6>Due Date : {todo?.deadline}</h6>
            <h6>Created by : {todo?.email_user}</h6>
            <form onSubmit={handleUpload}>
                <input type="file" id="filePicker" className="border rounded-xl p-2 m-2 " onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <button className="button">Upload</button>
            </form>
        </div>

    )
}
