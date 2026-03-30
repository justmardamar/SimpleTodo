import { supabaseClient } from "../supabaseClient";

export async function CreateUserGroup({groupId,userId,emailUser,roleId} : {groupId:string,userId:string,emailUser:string,roleId:number}) {
    const {error} = await supabaseClient.from('group_member')
    .insert({
        group_id : groupId,
        id_user : userId,
        email_user : emailUser,
        role_id : roleId
    })
    if(error){
        console.log(error)
        return
    }
    return true
}