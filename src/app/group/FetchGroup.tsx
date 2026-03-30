"use client"
import { supabaseClient } from "@/lib/supabaseClient"
import { useSessionUser } from "@/lib/useSessionUser"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchGroupsC } from "@/types/fetchGroupCtreated"

export default function FetchGroup() {
    const [groups, setGroups] = useState<any[]>([])
    const { session } = useSessionUser()

    const fetchCreated = async () => {
        const { data, error } = await supabaseClient.from('group_member')
            .select("id,groups(name),role_id,role_group (id,name),group_id")
            .eq('email_user', session?.user.email)
            .in('role_id', [1, 2])
        if (error) {
            console.log(error)
            return
        }
        setGroups(data)
    }
    useEffect(() => {
        if (!session?.user.email) return
        fetchCreated()
    }, [session?.user.email])

    return (
        <div className="dashboard-section">
            <ul className="dashboard-section flex flex-col gap-4">
                {groups?.length > 0 ? groups.map((group) => (
                    <li className="group-item-card" key={group.id}>
                        <div className="group-item-header">
                            <h5 className="group-item-name">{group.groups.name}</h5>
                            <span className="group-item-role">{group.role_group.name}</span>
                        </div>
                        <div className="group-item-actions">
                            <Link href={`/group/${group.group_id}`} className="btn btn-primary btn-sm">Detail</Link>
                            {group.role_group.id == 1 && (
                                <Link href={`/group/member/${group.group_id}?group_name=${group.groups.name}`} className="btn btn-secondary btn-sm">Add Members</Link>
                            )}
                            <Link href={`/group/todos/${group.group_id}`} className="btn btn-outline btn-sm">Create Todos</Link>
                            <Link href={`/group/chat/${group.group_id}`} className="btn btn-outline btn-sm">Chat</Link>
                        </div>
                    </li>
                )) : (
                    <li className="group-empty-state">No groups managed yet</li>
                )}
            </ul>
        </div>
    )
}
