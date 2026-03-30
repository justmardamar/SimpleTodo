"use client"

import { supabaseClient } from "@/lib/supabaseClient"

export default function DownloadFile({ id, fileName }: { id: string, fileName: string }) {
    const downloadFile = async () => {
        const { data, error } = await supabaseClient.storage.from("todos_file")
            .download(`Todos/${id}/${fileName}`)
        if (error) {
            console.log(error)
            return
        }
        const url = URL.createObjectURL(data)
        const a = document.createElement("a")
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()

        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }
    return (
        <button onClick={downloadFile} className="btn btn-outline btn-sm">Download</button>
    )
}
