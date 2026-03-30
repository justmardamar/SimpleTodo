"use client"
import { useSessionUser } from "@/lib/useSessionUser"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { CreateGroup } from "@/lib/group/CreateGroup"
import { CreateUserGroup } from "@/lib/users/CreateUser"


export default function FormAdd() {
    const [name , setName] = useState<string>()
    const {session} = useSessionUser()
    const router = useRouter()
    
    async function createGroup (e :any) {
        e.preventDefault()
        
        const groups = await CreateGroup({idUser:String(session?.user.id),
                                        nameGroup:String(name),
                                        createdBy:String(session?.user.email)})

        if(!groups){
            console.log('gagal membuat Group')
            return
        }

        const member = await CreateUserGroup({groupId:String(groups.group.id),
                                            userId:String(session?.user.id),
                                            emailUser:String(session?.user.email),
                                            roleId:1})
        if(!member){
            console.log('gagal membuat member')
            return
        }

        router.push('/group')
    }

    return (
        <div>
            <form onSubmit={createGroup} className="add-group-form">
                <input type="text" name='name' placeholder="nama group" onChange={(e) => setName(e.target.value)} className="border rounded-xl p-2"/>
                <div className="flex gap-2">
                    <button type="submit" className="btn btn-primary">Buat</button>
                    <Link href="/group" className="btn btn-secondary">Kembali</Link>
                </div>
            </form>
        </div>
    )
}
