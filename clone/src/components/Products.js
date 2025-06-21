
// // src/components/Products.js
// import React, { useEffect, useState } from 'react';
// import ProductCard from './ProductCard'; // ✅ make sure import name matches filename

// function Products({ addToCart }) {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/products')
//       .then(res => res.json())
//       .then(data => setProducts(data.products))
//       .catch(console.error);
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
//       {products.map(p => (
//         <ProductCard
//           key={p.product_id}
//           product={{
//             product_id: p.product_id,
//             name: p.product_name,
//             img: p.image,
//             stock_left: p.stock_left,
//             selling_price: p.selling_price,  // ✅ required for fallback
//             base_price: p.base_price         // ✅ required for fallback
//           }}
//           addToCart={addToCart}
//         />
//       ))}
//     </div>
//   );
// }

// export default Products;




import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
        console.log('Products fetched:', data.products);
        setProducts(data.products);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {products.map(p => (
        <ProductCard
          key={p.product_id}
          product={{
            product_id: p.product_id,
            product_name: p.product_name,  // use exact key
            image: p.image,                // use exact key
            stock_left: p.stock_left,
            selling_price: p.selling_price,
            base_price: p.base_price,
          }}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default Products;
