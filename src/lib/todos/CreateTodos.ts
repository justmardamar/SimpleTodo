import { supabaseClient } from "../supabaseClient"

export async function CreateTodos({dataList} : {dataList : any}){
    const {error} = await supabaseClient.from('todos').insert({
        title : dataList.title,
        notes : dataList.notes,
        deadline : dataList.deadline,
        priorities_id : dataList.priorities_id,
        status : dataList.status,
        group_id : dataList.group_id,
        user_id : dataList.user_id,
        email_user : dataList.email_user
    }).single()
    if(error){
        console.log(error)
        return
    }
    return true
}