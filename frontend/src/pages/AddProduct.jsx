import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', price: '', category: '', description: '', imageUrl: '', stock: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products', form);
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2>Tambah Produk Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label>Nama Produk</label><input name="name" onChange={handleChange} required /></div>
        <div className="form-group"><label>Harga (Rp)</label><input type="number" name="price" onChange={handleChange} required /></div>
        <div className="form-group"><label>Kategori</label><input name="category" onChange={handleChange} required /></div>
        <div className="form-group"><label>URL Gambar</label><input name="imageUrl" onChange={handleChange} required /></div>
        <div className="form-group"><label>Stok</label><input type="number" name="stock" onChange={handleChange} required /></div>
        <div className="form-group"><label>Deskripsi</label><textarea name="description" rows="4" onChange={handleChange} required></textarea></div>
        <button type="submit" className="btn">Simpan Produk</button>
      </form>
    </div>
  );
};

export default AddProduct;