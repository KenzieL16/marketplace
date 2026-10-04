import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ color: 'var(--primary-color)', fontSize: '2.5rem' }}>Selamat Datang di Market</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
        Platform E-Commerce Terpercaya dengan Berbagai Pilihan Produk Terbaik.
      </p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/products" className="btn" style={{ padding: '12px 24px', fontSize: '1rem' }}>
          Jelajahi Produk
        </Link>
      </div>
    </div>
  );
};

export default Home;