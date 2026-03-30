"use client"
import { useParams } from "next/navigation"
import { useState,useEffect } from "react"
import {FetchTodos} from "@/types/FetchTodos"
import { supabaseClient } from "@/lib/supabaseClient"
import Link from "next/link"
import FetchComment from "./FetchComment"
import {Todos} from "@/lib/todos/TodosRole"

export default function FetchTodo() {
    
    const { id } = useParams<{id : string}>()
    const [todos,setTodos] = useState<FetchTodos[]>([])
    

    const FetchTodo = async () => {
        const {data,error} = await Todos({group_id : id})

        if (error) {
            console.log(error)
            return
        }

        setTodos(data as any)
    }

    useEffect(() => {
        FetchTodo()
    },[id])


    return (
        <div>
            <h1>Daftar Todo</h1>
            <ul>
                {todos.length > 0 ? todos.map((todo) => (
                    <li key={todo.id} className="border rounded-xl p-4 mb-4">
                        <h2>{todo.title}</h2>
                        <h6>Due : {todo.deadline}</h6>
                        <p>{todo.notes}</p>
                        <p>Prioritas : {todo.priorities.name}</p>
                        <div className="flex gap-2">
                            <Link href={`/group/due/member/${todo.id}`} className="button">Create task</Link>
                        </div>
                        <FetchComment todoId={todo.id} />
                    </li>
                )) 
                :
                <li className="not-todo">Belum ada Todo</li>}
            </ul>
        </div>
    )
}
