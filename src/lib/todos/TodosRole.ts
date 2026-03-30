import { supabaseClient } from "../supabaseClient"


export function TodosRole({roleId,groupId} : {roleId: number,groupId:string}){
    let query = supabaseClient.from('todos')
            .select('id,notes,title,deadline,priorities_id,status,priorities(name)')
            .eq('group_id',groupId)
    if(roleId == 3){
        query = query.eq('status','incomplete')
    }
    return query
}

export function Todos({group_id} : {group_id : string}){
    return supabaseClient.from('todos')
            .select('id,notes,title,deadline,priorities_id,status,priorities(name)')
            .eq('group_id',group_id)
            .eq('status','incomplete')
            .order("created_at",{ascending : false})
}