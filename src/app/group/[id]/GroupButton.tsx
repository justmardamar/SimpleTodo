import { useState } from "react"
import ButtonDeleteUser from "./ButtonDeleteUser"
import { supabaseClient } from "@/lib/supabaseClient"

export default function GroupButton({ id_member, group_id }: { id_member: string, group_id: string }) {
    const [showInput, setShowInput] = useState(false)
    const [role, setRole] = useState("")
    
    const editRole = async (e : any) => {
        e.preventDefault()

        if (!role) {
            alert("Mohon pilih role terlebih dahulu")
            return
        }

        const { error } = await supabaseClient.from("group_member")
            .update({ role_id: Number(role) })
            .eq("group_id", group_id)
            .eq("id_user", id_member)
    
        if (error) {
            console.log(error)
            alert("Gagal mengupdate role")
            return
        }

        alert("Role berhasil diupdate")
        setShowInput(false)
        window.location.reload()
    }

    return (
        <>
            {showInput ? (
                <form onSubmit={editRole}>
                    <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">None</option>
                        <option value="1">Manager</option>
                        <option value="2">Admin</option>
                        <option value="3">Member</option>
                    </select>
                    <button type="submit">Edit</button>
                </form>
            ) : ""}
            <div className="flex gap-2 items-center m-auto">
                <button className="btn btn-primary btn-sm" onClick={() => setShowInput(!showInput)}>{showInput ? "Cancel" : "Edit Role"}</button>
                <ButtonDeleteUser id_member={id_member} group_id={group_id} />
            </div>
        </>
    )
}
