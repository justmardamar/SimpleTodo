import { supabaseClient } from "../supabaseClient"

export async function DeleteUserGroup({group_id,id_member} : {group_id:string,id_member:string}){
    const { error } = await supabaseClient.from("group_member")
        .update({ status: "inactive" })
        .eq("group_id", group_id)
        .eq("id_user", id_member)
    
    if (error) {
        return error
    }

    return true
}