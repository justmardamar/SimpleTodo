"use client"

import { useEffect, useState } from "react"
import { supabaseClient } from "@/lib/supabaseClient"
import { useSessionUser } from "../useSessionUser"

export function useRoleUserGroup(groupId : string){
    const [role,setRole] = useState<number | null>(null)
    const [loading,setLoading] = useState(true)
    const {session} = useSessionUser()

    useEffect(() => {
        if (!session?.user) return
        const fetchRole = async () => {
            const {data,error} = await supabaseClient.from("group_member").select("role_id").eq("group_id",groupId).eq("id_user",session?.user.id).single()
            if(error){
                console.log(error)
                return
            }
            setRole(data.role_id)
            setLoading(false)
        }
        fetchRole()
    }, [groupId,session?.user.id])

    return {role,loading}
}