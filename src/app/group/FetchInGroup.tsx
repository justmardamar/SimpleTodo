"use client"

import { useEffect, useState } from "react"
import { fetchJoinGroup } from "@/types/fetchGroupCtreated"
import { supabaseClient } from "@/lib/supabaseClient"
import { useSessionUser } from "@/lib/useSessionUser"
import Link from "next/link"

export default function FetchInGroup() {
    const [groups, setGroups] = useState<any[]>([])
    const { session } = useSessionUser()

    const fetchGroup = async () => {
        const { data, error } = await supabaseClient.from('group_member')
            .select('id,id_user,group_id ,role_id, groups(id,name) , role_group(name)')
            .eq('id_user', session?.user.id)
            .eq("role_id", 3)
        if (error) {
            console.log(error)
            return
        }
        setGroups(data)
    }

    useEffect(() => {
        if (!session?.user.email) return
        fetchGroup()
    }, [session?.user.email])

    return (
        <div className="dashboard-section">
            <ul className="dashboard-section flex flex-col gap-4">
                {groups.length > 0 ? groups.map((group) => (
                    <li className="group-item-card" key={group.id}>
                        <div className="group-item-header">
                            <h5 className="group-item-name">{group.groups.name}</h5>
                            <span className="group-item-role">{group.role_group.name}</span>
                        </div>
                        <div className="group-item-actions">
                            <Link href={`/group/${group.groups.id}`} className="btn btn-primary btn-sm">Detail</Link>
                            <Link href={`/group/due/${group.groups.id}`} className="btn btn-secondary btn-sm">Tasks</Link>
                        </div>
                    </li>
                )) : (
                    <li className="group-empty-state">No groups joined yet</li>
                )}
            </ul>
        </div>
    )
}
