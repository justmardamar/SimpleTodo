"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FileObject } from "@supabase/storage-js"
import DownloadFile from "./DownloadFile"
import CompleteStatus from "@/components/due/CompleteStatus"
import { FetchStorage } from "@/lib/todos/FetchStorage"

interface fileWithUrl extends FileObject {
    signedUrl: string
}

export default function FetchTask() {
    const { id } = useParams<{ id: string }>()
    const [files, setFiles] = useState<fileWithUrl[]>([])

    const fetchTask = async () => {
        const FileStorage = await FetchStorage({id_todos:id})
        if (!FileStorage) {
            return
        }
        setFiles(FileStorage)
    }

    useEffect(() => {
        fetchTask()
    }, [id])

    return (
        <div className="dashboard-section">
            <div className="admin-task-grid">
                {files.map((file) => (
                    <div key={file.name} className="admin-task-card">
                        <div className="admin-task-header">
                            <h5 className="admin-task-filename">{file.name}</h5>
                            <span className="admin-task-size">{file.metadata?.size} bytes</span>
                        </div>
                        <div className="admin-task-actions">
                            <a href={file.signedUrl} target="_blank" className="btn btn-secondary btn-sm">Buka File</a>
                            <DownloadFile id={id} fileName={file.name} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin-task-footer">
                <CompleteStatus id={id} />
            </div>
        </div>
    )
}
