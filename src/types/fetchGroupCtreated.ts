export interface fetchGroupsC {
    id: string,
    name: string,
    created_at: Date | null,
    created_by: string
}

export interface fetchMember {
    id: string,
    email_user: string,
    id_user: string,
    role_group: {
        id: string,
        name: string
    }[]
}

export interface fetchJoinGroup {
    id: string,
    role: string,
    id_user: string,
    groups: {
        id: string,
        name: string
    }[]
    role_group: {
        name: string
    }[]
}