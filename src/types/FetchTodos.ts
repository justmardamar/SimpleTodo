export interface FetchTodos {
    id : number
    title : string,
    notes: string,
    priorities_id : string,
    deadline : string,
    email_user: string | null,
    status : string
    done_at : string | null
    priorities : {
        name : string
    }
}