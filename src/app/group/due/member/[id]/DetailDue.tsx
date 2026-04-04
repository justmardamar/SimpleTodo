"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Todos } from "@/types/Todos"
import { useSessionUser } from "@/lib/useSessionUser"
import { useRouter } from "next/navigation"
import { UploadFileStorage,UploadTodoData } from "@/lib/todos/TodosUpload"

export default function DetailDue() {
    const router = useRouter()
    const { id } = useParams<{ id: string }>()
    const [todo, setTodo] = useState<Todos | any>(null)
    const [file, setFile] = useState<File | null>(null)
    const { session } = useSessionUser()

    const fetchTodo = async () => {
        const { data, error } = await supabaseClient.from("todos")
            .select("title,deadline,email_user,notes,priorities(name)")
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
        if (!session?.user.id || !session?.user.email) {
            return
        }
        const uploadFile = await UploadFileStorage({id_todos:id,file_name:file})
        if (!uploadFile) {
            alert("File yang didukung adalah pdf")
            return
        }
        const uploadTodoData = await UploadTodoData({todos_id:id,user_id:session?.user.id,email_user:session?.user.email})

        if (!uploadTodoData) {
            alert("Gagal menambahkan data")
            return
        }
        setFile(null)
        router.push('/group')
    }

    return (
        <div className="due-detail-wrapper">
            <div className="due-detail-card">
                <div className="due-header">
                    <h1 className="due-title">{todo?.title || 'Memuat...'}</h1>
                    <div className="due-info-grid">
                        <div className="due-info-item">
                            <span className="due-info-label">Prioritas</span>
                            <span className="due-info-value">
                                {todo?.priorities?.name ? (
                                    <span className="due-priority-badge">{todo.priorities?.name}</span>
                                ) : (
                                    '-'
                                )}
                            </span>
                        </div>
                        <div className="due-info-item">
                            <span className="due-info-label">Tenggat Waktu</span>
                            <span className="due-info-value">{todo?.deadline || '-'}</span>
                        </div>
                        <div className="due-info-item">
                            <span className="due-info-label">Dibuat Oleh</span>
                            <span className="due-info-value">{todo?.email_user || '-'}</span>
                        </div>
                    </div>
                </div>

                <div className="due-description">
                    <span className="due-info-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Catatan Tugas</span>
                    <p style={{ margin: 0 }}>{todo?.notes || 'Tidak ada catatan.'}</p>
                </div>

                <div className="due-upload-section">
                    <h3 className="due-upload-title">Kumpulkan Tugas</h3>
                    <form onSubmit={handleUpload} className="due-upload-form">
                        <input 
                            type="file" 
                            id="filePicker" 
                            className="due-file-input" 
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files?.[0] || null)} 
                        />
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={!file}
                        >
                            Unggah File PDF
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
