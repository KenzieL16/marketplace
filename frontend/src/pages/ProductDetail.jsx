import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
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
      <div className="product-detail-container">
        <img src={product.imageUrl} alt={product.name} className="product-detail-img" />
        <div>
          <h1 style={{ marginTop: 0 }}>{product.name}</h1>
          <h2 className="price" style={{ fontSize: '1.8rem' }}>Rp {product.price ? product.price.toLocaleString('id-ID') : 0}</h2>
          <p><strong>Kategori:</strong> {product.category}</p>
          <p><strong>Stok:</strong> {product.stock}</p>
          <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;