import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="landing-hero">
        <h1 className="landing-title">Selamat Datang di TodoSimple</h1>
        <p className="landing-subtitle">Kelola tugas harianmu dengan mudah, efisien, dan terorganisir.</p>
        <Link href="/auth/login" className="landing-cta-button">
          Mulai Sekarang
        </Link>
      </section>

      {/* About App Section */}
      <section className="landing-section">
        <h2 className="landing-section-title">Tentang Aplikasi</h2>
        <div className="landing-grid">
          <div className="landing-card">
            <h3>Sederhana</h3>
            <p>Antarmuka yang bersih dan mudah digunakan tanpa fitur yang membingungkan.</p>
          </div>
          <div className="landing-card">
            <h3>Terorganisir</h3>
            <p>Kelompokkan tugas-tugasmu ke dalam kategori agar lebih mudah dipantau.</p>
          </div>
          <div className="landing-card">
            <h3>Efisien</h3>
            <p>Hemat waktumu dengan pengelolaan tugas yang cepat dan responsif.</p>
          </div>
        </div>
      </section>

      {/* About Creator Section */}
      <section className="landing-section creator-section">
        <div className="creator-content">
          <h2 className="landing-section-title">Dibuat Oleh</h2>
          <div className="landing-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3>Pengembang Aplikasi</h3>
            <p>
              Aplikasi ini dikembangkan dengan dedikasi tinggi untuk membantu produktivitas harian Anda.
              Kami percaya bahwa manajemen waktu yang baik adalah kunci kesuksesan.
            </p>
            <div className="social-links">
              <a href="https://instagram.com/justmardamar" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Instagram</span>
              </a>
              {/* Tambahkan link sosial media lainnya jika diperlukan */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
