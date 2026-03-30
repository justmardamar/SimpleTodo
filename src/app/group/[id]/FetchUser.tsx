"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchMember } from "@/types/fetchGroupCtreated"
import { useRoleUserGroup } from "@/lib/users/useRoleUserGroup"
import GroupButton from "./GroupButton"
import { useSessionUser } from "@/lib/useSessionUser"
import { FetchUserGroup } from "@/lib/users/FetchUser"

export default function FetchUser() {
    const { id } = useParams<{ id: string }>()
    const [members, setMembers] = useState<fetchMember[]>([])
    const { role } = useRoleUserGroup(id)
    const { session } = useSessionUser()

    const fetchUser = async () => {
        const data = await FetchUserGroup({id_group:id})
        if (data) {
            console.log(data)
            return
        }
        setMembers(data)
    }

    useEffect(() => {
        fetchUser()
    }, [id])

    return (
        <div className="user-group">
            <ul>
                {members.map((member) => (
                    <li key={member.id}>
                        <h5>{member.email_user}</h5>
                        <p>Role : {member.role_group.name}</p>
                        {role == 1 ? 
                            (session?.user.id != member.id_user ? (
                                <GroupButton group_id={id} id_member={member.id_user} />
                            ) : "")
                         : ""}
                    </li>
                ))}
            </ul>
        </div>
    )
}
