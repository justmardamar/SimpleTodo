"use client"
import { useParams } from "next/navigation"
import { useState,useEffect } from "react"
import {FetchTodos} from "@/types/FetchTodos"
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
        <div className="task-list-container">
            <h1 className="task-list-title">Daftar Tugas</h1>
            <ul className="task-list">
                {todos.length > 0 ? todos.map((todo) => (
                    <li key={todo.id} className="task-card">
                        <div className="task-card-header">
                            <h2 className="task-card-title">{todo.title}</h2>
                            <div className="task-card-meta">
                                <div className="due-info-item">
                                    <span className="due-info-label">Tenggat Waktu</span>
                                    <span className="due-info-value">📅 {todo.deadline || '-'}</span>
                                </div>
                                <div className="due-info-item">
                                    <span className="due-info-label">Prioritas</span>
                                    <span className="due-info-value">
                                        {todo.priorities?.name ? (
                                            <span className="due-priority-badge">{todo.priorities.name}</span>
                                        ) : '-'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="task-card-notes">
                            <p style={{ margin: 0 }}>{todo.notes || 'Tidak ada catatan.'}</p>
                        </div>
                        
                        <div className="task-card-actions">
                            <Link href={`/group/due/member/${todo.id}`} className="btn btn-primary">Kerjakan Tugas</Link>
                        </div>
                        
                        <div className="task-card-comments">
                            <FetchComment todoId={todo.id} />
                        </div>
                    </li>
                )) 
                :
                <li className="task-empty">Belum ada tugas dalam daftar ini.</li>}
            </ul>
        </div>
    )
}
