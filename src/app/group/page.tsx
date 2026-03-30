import FetchGroup from "./FetchGroup"
import FetchInGroup from "./FetchInGroup"

export default function page() {
    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-card-content">
                    <div className="profile-header">
                        <h1 className="profile-title">Daftar Group</h1>
                        <p className="profile-subtitle">Lihat dan kelola grup yang Anda buat atau ikuti</p>
                    </div>

                    
                    <div className="dashboard-grid">
                        <div className="dashboard-section">
                            <div className="dashboard-section-header">
                                <h2 className="dashboard-section-title">Groups I Manage</h2>
                            </div>
                            <FetchGroup />
                        </div>

                        <div className="dashboard-section">
                            <div className="dashboard-section-header">
                                <h2 className="dashboard-section-title">Groups I've Joined</h2>
                            </div>
                            <FetchInGroup />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
