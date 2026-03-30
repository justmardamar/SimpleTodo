import { DeleteUserGroup } from "@/lib/users/DeleteUser"

export default function ButtonDeleteUser({ id_member, group_id }: { id_member: string, group_id: string }) {

    const deleteUser = async () => {
        const result = await DeleteUserGroup({ group_id, id_member })

        if (!result) {
            console.log(result)
            return
        }

        return true
    }

    return (
        <button className="btn btn-error btn-sm" onClick={deleteUser}>Delete</button>
    )
}
