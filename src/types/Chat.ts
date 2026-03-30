export interface fetchChat {
    id: string,
    user_id: string,
    text: string,
    created_at: Date | null,
    user_profiles: {
        id: string,
        email_user: string
    }
}