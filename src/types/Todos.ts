export interface Todos {
    id: string,
    title: string,
    notes: string,
    priorities_id: string,
    deadline: string,
    status: string,
    priorities: {
        name: string
    }[]
}

export interface TodosCreate {
    title: string,
    notes: string,
    priorities_id: string,
    deadline: string,
    email_user: string,
    status: string,
    done_at: string | null
}

export interface TodosCalendar {
    id: string,
    title: string,
    notes: string,
    email_user: string,
    deadline: string,
    priorities_id: string,
    priorities: {
        id: string,
        name: string
    }
}

export interface TodosDo {
    title: string,
    notes: string,
    deadline: string,
    email_user: string | null,
    group_id: string,
    user_id: string,
    status: string
    priorities_id: string
}

export interface Comments {
    id: number,
    comment: string,
    id_user: string,
    id_parent_comment: number | null,
    id_todos: number,
    user_profiles: {
        id: string,
        email_user: string
    }
}