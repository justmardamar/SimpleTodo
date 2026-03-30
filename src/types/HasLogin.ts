import { supabaseClient } from "@/lib/supabaseClient";

export async function hasLogin(){
    const {data} = await supabaseClient.auth.getUser()
    if(!data.user){
        return false
    }
    return true
}