import { supabaseClient } from "../supabaseClient";

export async function CreateGroup({idUser,nameGroup,createdBy} : {idUser:string,nameGroup:string,createdBy:string}) {
  const {data:group,error} = await supabaseClient.from('groups')
  .insert({
    id_user : idUser,
    name : nameGroup,
    created_by : createdBy
  })
  .select("id")
  .single()
  if(error){
    console.log(error)
    return
  }
  return {group}
}

