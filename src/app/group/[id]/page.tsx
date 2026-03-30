import FetchUser from "./FetchUser"
import TodosGroup from "./TodosGroup"

export default function page() {
    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-card-content">
                    <div className="profile-header">
                        <h1 className="profile-title">Detail Group</h1>
                        <p className="profile-subtitle">Lihat dan kelola grup yang Anda buat atau ikuti</p>
                    </div>
                    <FetchUser/>
                    <TodosGroup/>
                </div>
            </div>
        </div>
    )
}
