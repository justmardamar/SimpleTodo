import FetchTask from "./FetchTask"

export default function page() {
    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-card-content">
                    <div className="profile-header text-center mb-8">
                        <h1 className="profile-title">Daftar Task yang telah dikumpulkan</h1>
                        <p className="profile-subtitle">Kelola dan selesaikan tugas yang dikirimkan oleh anggota grup</p>
                    </div>

                    <FetchTask />
                </div>
            </div>
        </div>
    )
}
