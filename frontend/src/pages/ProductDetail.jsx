import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="container"><p>Memuat data...</p></div>;

  return (
    <div className="container">
      <Link to="/products" className="btn btn-secondary" style={{ marginBottom: '20px' }}>&larr; Kembali</Link>
      <div style={{ display: 'flex', gap: '30px', background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <img src={product.imageUrl} alt={product.name} style={{ width: '350px', height: '350px', objectFit: 'cover', borderRadius: '8px' }} />
        <div>
          <h1 style={{ marginTop: 0 }}>{product.name}</h1>
          <h2 className="price" style={{ fontSize: '1.8rem' }}>Rp {product.price.toLocaleString('id-ID')}</h2>
          <p><strong>Kategori:</strong> {product.category}</p>
          <p><strong>Stok:</strong> {product.stock}</p>
          <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;