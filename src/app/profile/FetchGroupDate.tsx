"use client"
import { supabaseClient } from '@/lib/supabaseClient'
import { useSessionUser } from '@/lib/useSessionUser'
import { useState, useEffect } from 'react'
import CalendarTodo from './CalendarTodo'

export default function FetchGroupDate() {

    const { session } = useSessionUser()
    const [groups, setGroups] = useState<any[]>([])
    const [show, setShow] = useState(false)
    const [groupId, setGroupId] = useState<string>("")

    const fetchGroup = async () => {
        if (!session?.user.email) return
        const { data, error } = await supabaseClient.from("group_member").select("group_id,email_user, groups (id,name)")
            .eq("email_user", session?.user.email)

        if (error) {
            console.log(error)
            return
        }
        setGroups(data)
    }

    const selectGroup = (id: string) => {
        setShow(true)
        setGroupId(id)
    }

    useEffect(() => {
        if (!session?.user.email) return
        fetchGroup()
    }, [session?.user.email])


    return (
        <div className="group-section">
            <h4 className='group-title'>Todo Group Groups</h4>
            <div className='group-list'>
                {groups.map((group) => (
                    <button
                        key={group.group_id}
                        className={`btn btn-sm ${groupId === group.group_id
                                ? 'btn-active'
                                : 'btn-secondary'
                            }`}
                        onClick={() => selectGroup(group.group_id)}
                    >
                        {group.groups.name}
                    </button>
                ))}
            </div>
            {show && (
                <div className="calendar-container">
                    <CalendarTodo key={groupId} locale={"en"} group_id={groupId} />
                </div>
            )}
        </div>
    )
}
