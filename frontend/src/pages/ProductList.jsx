import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const res = await API.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Daftar Produk</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <img src={p.imageUrl} alt={p.name} />
            <div className="info">
              <h3>{p.name}</h3>
              <p className="price">Rp {p.price ? p.price.toLocaleString('id-ID') : 0}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Kategori: {p.category}</p>
              <div style={{ marginTop: '15px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Link to={`/products/${p._id}`} className="btn">Detail</Link>
                <Link to={`/edit-product/${p._id}`} className="btn btn-secondary">Edit</Link>
                <button onClick={() => handleDelete(p._id)} className="btn btn-danger">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;