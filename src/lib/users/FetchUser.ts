import { supabaseClient } from "../supabaseClient"

export async function FetchUserGroup({id_group} : {id_group:string}){
    const { data, error } = await supabaseClient.from('group_member')
        .select("id,email_user, role_id,id_user, role_group:role_id (id,name)")
        .eq('group_id', id_group)
        .eq('status','active')
        .order('role_id', { ascending: true })
    
    if(error){
        console.log(error)
        return []
    }
    return data ?? []
}