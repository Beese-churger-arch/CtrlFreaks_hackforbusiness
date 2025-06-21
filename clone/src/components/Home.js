import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import styles from './css/Home.module.css';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/inventory.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch inventory.json');
        return res.json();
      })
      .then(data => {
        // Optional: filter or clean data here if needed
        const validProducts = data.filter(p => p.product_name && p.image && p.selling_price > 0);
        // Map keys if your ProductCard expects different keys (e.g. id, name, img)
        const mappedProducts = validProducts.map(p => ({
          id: p.product_id,
          name: p.product_name,
          img: p.image,
          price: parseFloat(p.selling_price),
          description: p.description,
          brand: p.brand_name,
          stock: parseInt(p.stock_left, 10),
          category: p.product_category,
          restockThreshold: parseInt(p.restock_threshold, 10),
          restockDate: p.last_restocked_date,
          salesVolume: parseInt(p.sales_volume, 10),
        }));
        setProducts(mappedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading JSON:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="page"><p>Loading products...</p></div>;
  if (products.length === 0) return <div className="page"><p>No products available.</p></div>;

  return (
    <div className="page">
      <div className={styles.productGrid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default Home;

