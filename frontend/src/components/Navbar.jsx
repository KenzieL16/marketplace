import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" onClick={closeMenu}>
        Market
      </Link>

      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" onClick={closeMenu}>Beranda</Link>
        <Link to="/products" onClick={closeMenu}>Daftar Produk</Link>
        <Link to="/add-product" onClick={closeMenu}>+ Tambah Produk</Link>
      </div>
    </nav>
  );
};

export default Navbar;