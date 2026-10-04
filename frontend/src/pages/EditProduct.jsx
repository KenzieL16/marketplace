import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', category: '', description: '', imageUrl: '', stock: '' });

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/products/${id}`, form);
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2>Edit Produk</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label>Nama Produk</label><input name="name" value={form.name} onChange={handleChange} required /></div>
        <div className="form-group"><label>Harga (Rp)</label><input type="number" name="price" value={form.price} onChange={handleChange} required /></div>
        <div className="form-group"><label>Kategori</label><input name="category" value={form.category} onChange={handleChange} required /></div>
        <div className="form-group"><label>URL Gambar</label><input name="imageUrl" value={form.imageUrl} onChange={handleChange} required /></div>
        <div className="form-group"><label>Stok</label><input type="number" name="stock" value={form.stock} onChange={handleChange} required /></div>
        <div className="form-group"><label>Deskripsi</label><textarea name="description" rows="4" value={form.description} onChange={handleChange} required></textarea></div>
        <button type="submit" className="btn">Perbarui Produk</button>
      </form>
    </div>
  );
};

export default EditProduct;