"use client"
import { getUserInfo } from '@/lib/getUserInfo'
import { useSessionUser } from '@/lib/useSessionUser'

export default function InfoUser() {
    const { username } = getUserInfo()
    const { session } = useSessionUser()

    return (
        <div className='profile-info-grid'>
            <div className="profile-info-item">
                <span className="profile-label">Username</span>
                <span className="profile-value">{username}</span>
            </div>
            <div className="profile-info-item">
                <span className="profile-label">Email Address</span>
                <span className="profile-value">{session?.user.email}</span>
            </div>
            <div className="profile-info-item">
                <span className="profile-label">Account Role</span>
                <span className="profile-badge">
                    {session?.user.app_metadata.role}
                </span>
            </div>
        </div>
    )
}
