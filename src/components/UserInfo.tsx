"use client"
import { getUserInfo } from "@/lib/getUserInfo"
import { useSessionUser } from "@/lib/useSessionUser"

export default function UserInfo() {
    const {username} = getUserInfo()
    const {session} = useSessionUser()

    const email = session?.user.email
    const role = session?.user.app_metadata.role

    return (
        <div>
            <p>{email ? `Email : ${String(email)}` : "Anda Belum Login"}</p>
            <p>{username ? `Username : ${String(username)}` : "Anda Belum Login"}</p>
            <p>{role ? `Role : ${String(role)}` : "Anda belum login"}</p>
        </div>
    )
}
