import { supabaseClient } from "../supabaseClient";

export async function UploadFileStorage({id_todos,file_name}:{id_todos:string,file_name:File}) {
    const {error} = await supabaseClient.storage.from("todos_file")
    .upload(
        `Todos/${id_todos}/${Date.now()}_${file_name.name}`,
        file_name
    )
    if (error) {
        console.log(error)
        return false
    }
    return true
}

export async function UploadTodoData({todos_id,user_id,email_user}:{todos_id:string,user_id:string,email_user:string}){
    const {error} = await supabaseClient.from("todos_member")
    .insert({
        todos_id,
        user_id,
        email_user
    })
    if (error) {
        console.log(error)
        return false
    }
    return true
}