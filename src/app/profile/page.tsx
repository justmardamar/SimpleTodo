import InfoUser from "./InfoUser"
import Link from "next/link"
import FetchGroupDate from "./FetchGroupDate"
import LogOut from "./LogOut"

export default function page() {
    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-card-content">
                    <div className="profile-header">
                        <h1 className="profile-title">User Profile</h1>
                        <p className="profile-subtitle">Manage your account and view your groups</p>
                    </div>

                    <InfoUser />

                    <div className="profile-actions">
                        <Link href={"/group/add"} className="btn btn-primary">
                            Create Group
                        </Link>
                        <Link href="/profile/edit" className="btn btn-secondary">
                            Edit Profile
                        </Link>
                        <Link href="/profile/message" className="btn btn-outline">
                            Messages
                        </Link>
                        <LogOut />
                    </div>

                    <FetchGroupDate />
                </div>
            </div>
        </div>
    )
}
