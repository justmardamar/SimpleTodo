import { supabaseClient } from "../supabaseClient"

export async function FetchStorage({id_todos}: {id_todos: string}) {
    const { data, error } = await supabaseClient.storage.from("todos_file")
        .list(`Todos/${id_todos}`)
    if (error) {
        console.log(error)
        return
    }
    const signedFiles = await Promise.all(
        data.map(async (file) => {
            const { data: signed } = await supabaseClient.storage
                .from("todos_file")
                .createSignedUrl(`Todos/${id_todos}/${file.name}`, 60)

            return {
                ...file,
                signedUrl: signed?.signedUrl || ""
            }
        })
    )
    return signedFiles
}


