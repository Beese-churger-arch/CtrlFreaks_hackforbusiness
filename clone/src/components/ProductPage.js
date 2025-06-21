
// // src/components/ProductPage.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Papa from 'papaparse';
// import styles from './css/ProductPage.module.css';

// function ProductPage({ addToCart }) {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch('/inventory.csv')
//       .then((res) => res.text())
//       .then((data) => {
//         const parsed = Papa.parse(data, {
//           header: true,
//           skipEmptyLines: true,
//         });

//         const found = parsed.data.find((p) => p.product_id === id);
//         setProduct(found);
//       });
//   }, [id]);

//   if (!product) {
//     return <div className={styles.page}>Loading or product not found...</div>;
//   }

//   return (
//     <div className={styles.page}>
//       <img
//         src={product.image}
//         alt={product.product_name}
//         className={styles.image}
//         onError={(e) => (e.target.src = '/placeholder.jpg')} // fallback
//       />
//       <div className={styles.info}>
//         <h1>{product.product_name}</h1>
//         <h2>₹{product.selling_price}</h2>
//         <p><b>Description</b></p>
//         <p>{product.description}</p>
//         <p><b>Stock = </b>{product.stock_left}</p>
//         <button className={styles.button} onClick={() => addToCart(product)}>
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './css/ProductPage.module.css';

// function ProductPage({ addToCart }) {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch('/inventory.json')
//       .then((res) => res.json())
//       .then((data) => {
//         const found = data.find((p) => p.product_id === id);
//         setProduct(found);
//       })
//       .catch((err) => {
//         console.error('Failed to load product:', err);
//         setProduct(null);
//       });
//   }, [id]);

//   if (!product) {
//     return <div className={styles.page}>Loading or product not found...</div>;
//   }

//   return (
//     <div className={styles.page}>
//       <img
//         src={product.image}
//         alt={product.product_name}
//         className={styles.image}
//         onError={(e) => (e.target.src = '/placeholder.jpg')}
//       />
//       <div className={styles.info}>
//         <h1>{product.product_name}</h1>
//         <h2>₹{product.selling_price}</h2>
//         <p><b>Description</b></p>
//         <p>{product.description}</p>
//         <p><b>Stock = </b>{product.stock_left}</p>
//         <button className={styles.button} onClick={() => addToCart(product)}>
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;


// // ProductPage.jsx
// import React from 'react';
// import styles from './ProductPage.module.css';

// export default function ProductPage({ product }) {
//   const price = product.dynamicPrice?.toFixed(2) || product.selling_price;
//   const basePrice = parseFloat(product.base_price);

//   return (
//     <div className={styles.page}>
//       <img src={product.image} alt={product.product_name} className={styles.image} />
//       <h1>{product.product_name}</h1>

//       {product.discountPercent > 0 && (
//         <div className={styles.discountBadge}>{product.discountPercent}% OFF</div>
//       )}

//       <div className={styles.prices}>
//         <span className={styles.price}>₹{price}</span>
//         {basePrice > price && (
//           <span className={styles.basePrice}>₹{basePrice.toFixed(2)}</span>
//         )}
//       </div>

//       <p>{product.description}</p>
//     </div>
//   );
// }






// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './css/ProductPage.module.css';

// function ProductPage({ addToCart }) {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     fetch('http://localhost:5000/products')  // fetch from backend products API
//       .then(res => res.json())
//       .then(data => {
//         // data.products contains array of products with dynamicPrice, discountPercent etc.
//         const found = data.products.find(p => p.product_id === id);
//         setProduct(found || null);
//       })
//       .catch(err => {
//         console.error('Failed to load product:', err);
//         setProduct(null);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) {
//     return <div className={styles.page}>Loading product details...</div>;
//   }

//   if (!product) {
//     return <div className={styles.page}>Product not found.</div>;
//   }

//   const price = product.dynamicPrice?.toFixed(2) || product.selling_price;
//   const basePrice = parseFloat(product.base_price);

//   return (
//     <div className={styles.page}>
//       <img
//         src={product.image}
//         alt={product.product_name}
//         className={styles.image}
//         onError={e => { e.target.src = '/placeholder.jpg'; }}
//       />

//       {product.discountPercent > 0 && (
//         <div className={styles.discountBadge}>{product.discountPercent}% OFF</div>
//       )}

//       <h1>{product.product_name}</h1>

//       <div className={styles.prices}>
//         <span className={styles.price}>₹{price}</span>
//         {basePrice > price && (
//           <span className={styles.basePrice}>₹{basePrice.toFixed(2)}</span>
//         )}
//       </div>

//       <p><b>Description</b></p>
//       <p>{product.description}</p>

//       <p><b>Stock = </b>{product.stock_left}</p>

//       <button className={styles.button} onClick={() => addToCart(product)} disabled={product.stock_left < 1}>
//         {product.stock_left < 1 ? 'Out of Stock' : 'Add to Cart'}
//       </button>
//     </div>
//   );
// }

// export default ProductPage;














// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './css/ProductPage.module.css';

// function ProductPage({ addToCart }) {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     fetch('http://localhost:5000/products')
//       .then(res => res.json())
//       .then(data => {
//         const found = data.products.find(p => p.product_id === id);
//         setProduct(found || null);
//       })
//       .catch(err => {
//         console.error('Failed to load product:', err);
//         setProduct(null);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <div className={styles.page}>Loading product details...</div>;
//   if (!product) return <div className={styles.page}>Product not found.</div>;

//   const price = product.dynamicPrice?.toFixed(2) || product.selling_price;
//   const basePrice = parseFloat(product.base_price);

//   return (
//     <div className={styles.page}>
//       <div className={styles.container}>
//         <div className={styles.imageWrapper}>
//           <img
//             src={product.image}
//             alt={product.product_name}
//             className={styles.image}
//             onError={e => { e.target.src = '/placeholder.jpg'; }}
//           />
//         </div>

//         <div className={styles.details}>
//           {product.discountPercent > 0 && (
//             <div className={styles.discountBadge}>{product.discountPercent}% OFF</div>
//           )}

//           <h1 className={styles.name}>{product.product_name}</h1>

//           <div className={styles.prices}>
//             <span className={styles.price}>₹{price}</span>
//             {basePrice > price && (
//               <span className={styles.basePrice}>₹{basePrice.toFixed(2)}</span>
//             )}
//           </div>

//           <p><b>Description:</b></p>
//           <p>{product.description}</p>

//           <p><b>Stock:</b> {product.stock_left}</p>

//           <button
//             className={styles.button}
//             onClick={() => addToCart(product)}
//             disabled={product.stock_left < 1}
//           >
//             {product.stock_left < 1 ? 'Out of Stock' : 'Add to Cart'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;



























// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './css/ProductPage.module.css';
// import DynamicPrice from './DynamicPrice';


// function ProductPage({ addToCart }) {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     setLoading(true);
//     fetch('http://localhost:5000/products')
//       .then(res => res.json())
//       .then(data => {
//         const found = data.products.find(p => p.product_id === id);
//         setProduct(found || null);
//       })
//       .catch(err => {
//         console.error('Failed to load product:', err);
//         setProduct(null);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <div className={styles.page}>Loading product details...</div>;
//   if (!product) return <div className={styles.page}>Product not found.</div>;

//   const price = product.dynamicPrice?.toFixed(2) || product.selling_price;
//   const basePrice = parseFloat(product.base_price);

//   // Clamp quantity between 1 and stock_left
//   const increaseQty = () => {
//     if (quantity < product.stock_left) setQuantity(q => q + 1);
//   };
//   const decreaseQty = () => {
//     if (quantity > 1) setQuantity(q => q - 1);
//   };

//   return (
//     <div className={styles.page}>
//       <div className={styles.container}>
//         <div className={styles.imageWrapper}>
//           <img
//             src={product.image}
//             alt={product.product_name}
//             className={styles.image}
//             onError={e => { e.target.src = '/placeholder.jpg'; }}
//           />
//         </div>

//         <div className={styles.details}>
//           {product.discountPercent > 0 && (
//             <div className={styles.discountBadge}>{product.discountPercent}% OFF</div>
//           )}

//           <h1 className={styles.name}>{product.product_name}</h1>

//           {/* <div className={styles.prices}>
//             <span className={styles.price}>₹{price}</span>
//             {basePrice > price && (
//               <span className={styles.basePrice}>₹{basePrice.toFixed(2)}</span>
//             )}
//           </div> */}
//           <div className={styles.prices}>
//             <DynamicPrice productId={product.product_id} />
//             </div>



//           <p><b>Description</b></p>
//           <p>{product.description}</p>

//           <p><b>Stock:</b> {product.stock_left}</p>

//           <div className={styles.quantityControls}>
//             <button onClick={decreaseQty} disabled={quantity <= 1}>-</button>
//             <span className={styles.quantity}>{quantity}</span>
//             <button onClick={increaseQty} disabled={quantity >= product.stock_left}>+</button>
//           </div>

//           <button
//             className={styles.button}
//             onClick={() => addToCart({ ...product, quantity })}
//             disabled={product.stock_left < 1}
//           >
//             {product.stock_left < 1 ? 'Out of Stock' : 'Add to Cart'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;






// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './css/ProductPage.module.css';
// import DynamicPrice from './DynamicPrice';

// function ProductPage({ addToCart }) {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   // Fetch product details
//   useEffect(() => {
//     setLoading(true);
//     fetch('http://localhost:5000/products')
//       .then(res => res.json())
//       .then(data => {
//         const found = data.products.find(p => p.product_id === id);
//         setProduct(found || null);
//       })
//       .catch(err => {
//         console.error('Failed to load product:', err);
//         setProduct(null);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <div className={styles.page}>Loading product details...</div>;
//   if (!product) return <div className={styles.page}>Product not found.</div>;

//   const increaseQty = () => {
//     if (quantity < product.stock_left) setQuantity(q => q + 1);
//   };

//   const decreaseQty = () => {
//     if (quantity > 1) setQuantity(q => q - 1);
//   };

//   return (
//     <div className={styles.page}>
//       <div className={styles.container}>
//         <div className={styles.imageWrapper}>
//           <img
//             src={product.image}
//             alt={product.product_name}
//             className={styles.image}
//             onError={e => {
//               e.target.src = '/placeholder.jpg';
//             }}
//           />
//         </div>

//         <div className={styles.details}>
//           <h1 className={styles.name}>{product.product_name}</h1>

//           <div className={styles.prices}>
//             <DynamicPrice productId={product.product_id} fallbackPrice={product.selling_price} basePrice={product.base_price} />
//           </div>

//           <p><b>Description</b></p>
//           <p>{product.description}</p>

//           <p><b>Stock:</b> {product.stock_left}</p>

//           <div className={styles.quantityControls}>
//             <button onClick={decreaseQty} disabled={quantity <= 1}>-</button>
//             <span className={styles.quantity}>{quantity}</span>
//             <button onClick={increaseQty} disabled={quantity >= product.stock_left}>+</button>
//           </div>

//           <button
//             className={styles.button}
//             onClick={() => addToCart({ ...product, quantity })}
//             disabled={product.stock_left < 1}
//           >
//             {product.stock_left < 1 ? 'Out of Stock' : 'Add to Cart'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './css/ProductPage.module.css';
// import DynamicPrice from './DynamicPrice';

// function ProductPage({ addToCart }) {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);


//   useEffect(() => {
//   setLoading(true);
//   fetch('http://localhost:5000/products')
//     .then(res => {
//       console.log('Response status:', res.status);
//       return res.json();
//     })
//     .then(data => {
//       console.log('Fetched products:', data);
//       const found = data.products.find(p => p.product_id === id);
//       if (!found) console.warn(`Product with id ${id} not found`);
//       setProduct(found || null);
//     })
//     .catch(err => {
//       console.error('Failed to load product:', err);
//       setProduct(null);
//     })
//     .finally(() => setLoading(false));
// }, [id]);


//   return (
//     <div className={styles.page}>
//       <div className={styles.container}>
//         <div className={styles.imageWrapper}>
//           <img
//             src={product.image}
//             alt={product.product_name}
//             className={styles.image}
//             onError={e => {
//               e.target.src = '/placeholder.jpg';
//             }}
//           />
//         </div>

//         <div className={styles.details}>
//           <h1 className={styles.name}>{product.product_name}</h1>

//           <div className={styles.prices}>
//             <DynamicPrice
//               productId={product.product_id}
//               fallbackPrice={product.selling_price}
//               basePrice={product.base_price}
//             />
//           </div>

//           <p><b>Description</b></p>
//           <p>{product.description}</p>

//           <p><b>Stock:</b> {product.stock_left}</p>

//           <div className={styles.quantityControls}>
//             <button onClick={decreaseQty} disabled={quantity <= 1}>-</button>
//             <span className={styles.quantity}>{quantity}</span>
//             <button onClick={increaseQty} disabled={quantity >= product.stock_left}>+</button>
//           </div>

//           <button
//             className={styles.button}
//             onClick={() => addToCart({ ...product, quantity })}
//             disabled={product.stock_left < 1}
//           >
//             {product.stock_left < 1 ? 'Out of Stock' : 'Add to Cart'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     fetch('http://localhost:5000/products')
//       .then(res => {
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         const found = data.products.find(p => p.product_id === id);
//         if (!found) {
//           setError(`Product with id ${id} not found.`);
//           setProduct(null);
//         } else {
//           setProduct(found);
//           setError(null);
//         }
//       })
//       .catch(err => {
//         setError(err.message);
//         setProduct(null);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <div>Loading product data...</div>;
//   if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
//   if (!product) return <div>No product data to display.</div>;

//   return (
//     <div style={{ whiteSpace: 'pre-wrap', padding: '1rem', fontFamily: 'monospace' }}>
//       {JSON.stringify(product, null, 2)}
//     </div>
//   );
// }

// export default ProductPage;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     fetch('http://localhost:5000/')
//       .then(res => {
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         const found = data.products.find(p => p.product_id === id);
//         if (!found) {
//           setError(`Product with id ${id} not found.`);
//           setProduct(null);
//         } else {
//           setProduct(found);
//           setError(null);
//         }
//       })
//       .catch(err => {
//         setError(err.message);
//         setProduct(null);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <main style={{ padding: '2rem' }}>Loading product data...</main>;
//   if (error) return <main style={{ padding: '2rem', color: 'red' }}>Error: {error}</main>;
//   if (!product) return <main style={{ padding: '2rem' }}>No product data to display.</main>;

//   return (
//     <main style={{ padding: '2rem' }}>
//       <h2>{product.product_name}</h2>
//       <img
//         src={product.image || '/placeholder.jpg'}
//         alt={product.product_name}
//         style={{ maxWidth: '300px', marginBottom: '1rem' }}
//         onError={e => { e.target.src = '/placeholder.jpg'; }}
//       />
//       <p><b>Description:</b> {product.description}</p>
//       <p><b>Category:</b> {product.product_category}</p>
//       <p><b>Price:</b> ₹{product.selling_price}</p>
//       <p><b>Stock left:</b> {product.stock_left}</p>
//     </main>
//   );
// }

// export default ProductPage;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import DynamicPrice from './DynamicPrice'; // ✅ Make sure path is correct

// function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     fetch('http://localhost:5000/products') // ✅ fixed: was just `/` before
//       .then(res => {
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         const found = data.products.find(p => p.product_id === id);
//         if (!found) {
//           setError(`Product with id ${id} not found.`);
//           setProduct(null);
//         } else {
//           setProduct(found);
//           setError(null);
//         }
//       })
//       .catch(err => {
//         setError(err.message);
//         setProduct(null);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <main style={{ padding: '2rem' }}>Loading product data...</main>;
//   if (error) return <main style={{ padding: '2rem', color: 'red' }}>Error: {error}</main>;
//   if (!product) return <main style={{ padding: '2rem' }}>No product data to display.</main>;

//   return (
//     <main style={{ padding: '2rem' }}>
//       <h2>{product.product_name}</h2>
//       <img
//         src={product.image || '/placeholder.jpg'}
//         alt={product.product_name}
//         style={{ maxWidth: '300px', marginBottom: '1rem' }}
//         onError={e => { e.target.src = '/placeholder.jpg'; }}
//       />
//       <p><b>Description:</b> {product.description}</p>
//       <p><b>Category:</b> {product.product_category}</p>

//       {/* ✅ Replaced static price */}
//       <div>
//         <b>Price:</b>
//         <DynamicPrice
//           productId={product.product_id}
//           fallbackPrice={product.selling_price}
//           basePrice={product.base_price}
//         />
//       </div>

//       <p><b>Stock left:</b> {product.stock_left}</p>
//     </main>
//   );
// }

// export default ProductPage;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './css/ProductPage.module.css';
// import DynamicPrice from './DynamicPrice';

// function ProductPage({ addToCart }) {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);


//   useEffect(() => {
//   setLoading(true);
//   fetch('http://localhost:5000/products')
//     .then(res => {
//       console.log('Response status:', res.status);
//       return res.json();
//     })
//     .then(data => {
//       console.log('Fetched products:', data);
//       const found = data.products.find(p => p.product_id === id);
//       if (!found) console.warn(`Product with id ${id} not found`);
//       setProduct(found || null);
//     })
//     .catch(err => {
//       console.error('Failed to load product:', err);
//       setProduct(null);
//     })
//     .finally(() => setLoading(false));
// }, [id]);


//   return (
//     <div className={styles.page}>
//       <div className={styles.container}>
//         <div className={styles.imageWrapper}>
//           <img
//             src={product.image}
//             alt={product.product_name}
//             className={styles.image}
//             onError={e => {
//               e.target.src = '/placeholder.jpg';
//             }}
//           />
//         </div>

//         <div className={styles.details}>
//           <h1 className={styles.name}>{product.product_name}</h1>

//           <div className={styles.prices}>
//             <DynamicPrice
//               productId={product.product_id}
//               fallbackPrice={product.selling_price}
//               basePrice={product.base_price}
//             />
//           </div>

//           <p><b>Description</b></p>
//           <p>{product.description}</p>

//           <p><b>Stock:</b> {product.stock_left}</p>

//           <div className={styles.quantityControls}>
//             <button onClick={decreaseQty} disabled={quantity <= 1}>-</button>
//             <span className={styles.quantity}>{quantity}</span>
//             <button onClick={increaseQty} disabled={quantity >= product.stock_left}>+</button>
//           </div>

//           <button
//             className={styles.button}
//             onClick={() => addToCart({ ...product, quantity })}
//             disabled={product.stock_left < 1}
//           >
//             {product.stock_left < 1 ? 'Out of Stock' : 'Add to Cart'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './css/ProductPage.module.css';
// import DynamicPrice from './DynamicPrice';

// function ProductPage({ addToCart }) {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     fetch('http://localhost:5000/products')
//       .then(res => {
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         const found = data.products.find(p => p.product_id === id);
//         if (!found) {
//           setError(`Product with id ${id} not found`);
//           setProduct(null);
//         } else {
//           setProduct(found);
//         }
//       })
//       .catch(err => {
//         setError('Failed to load product data.');
//         setProduct(null);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   // Handlers to adjust quantity within bounds
//   const increaseQty = () => {
//     if (product && quantity < product.stock_left) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decreaseQty = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   if (loading) {
//     return <main style={{ padding: '2rem' }}>Loading product...</main>;
//   }

//   if (error) {
//     return <main style={{ padding: '2rem', color: 'red' }}>{error}</main>;
//   }

//   if (!product) {
//     return <main style={{ padding: '2rem' }}>Product not found.</main>;
//   }

//   return (
//     <div className={styles.page}>
//       <div className={styles.container}>
//         <div className={styles.imageWrapper}>
//           <img
//             src={product.image || '/placeholder.jpg'}
//             alt={product.product_name || 'Product image'}
//             className={styles.image}
//             onError={e => {
//               e.target.src = '/placeholder.jpg';
//             }}
//           />
//         </div>

//         <div className={styles.details}>
//           <h1 className={styles.name}>{product.product_name}</h1>

//           <div className={styles.prices}>
//             <DynamicPrice
//               productId={product.product_id}
//               fallbackPrice={product.selling_price}
//               basePrice={product.base_price}
//             />
//           </div>

//           <p><b>Description</b></p>
//           <p>{product.description}</p>

//           <p><b>Stock:</b> {product.stock_left}</p>

//           <div className={styles.quantityControls}>
//             <button onClick={decreaseQty} disabled={quantity <= 1}>-</button>
//             <span className={styles.quantity}>{quantity}</span>
//             <button onClick={increaseQty} disabled={quantity >= product.stock_left}>+</button>
//           </div>

//           <button
//             className={styles.button}
//             onClick={() => addToCart({ ...product, quantity })}
//             disabled={product.stock_left < 1}
//           >
//             {product.stock_left < 1 ? 'Out of Stock' : 'Add to Cart'}
//           </button>
//         </div>
//       </div>
//     </div>
    
//   );
// }

// export default ProductPage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './css/ProductPage.module.css';
import DynamicPrice from './DynamicPrice';

function ProductPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [latestPrice, setLatestPrice] = useState(null); // ✅ dynamic price

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/products')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const found = data.products.find(p => p.product_id === id);
        if (!found) {
          setError(`Product with id ${id} not found`);
          setProduct(null);
        } else {
          setProduct(found);
        }
      })
      .catch(err => {
        setError('Failed to load product data.');
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Handlers to adjust quantity within bounds
  const increaseQty = () => {
    if (product && quantity < product.stock_left) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return <main style={{ padding: '2rem' }}>Loading product...</main>;
  }

  if (error) {
    return <main style={{ padding: '2rem', color: 'red' }}>{error}</main>;
  }

  if (!product) {
    return <main style={{ padding: '2rem' }}>Product not found.</main>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image || '/placeholder.jpg'}
            alt={product.product_name || 'Product image'}
            className={styles.image}
            onError={e => {
              e.target.src = '/placeholder.jpg';
            }}
          />
        </div>

        <div className={styles.details}>
          <h1 className={styles.name}>{product.product_name}</h1>

          <div className={styles.prices}>
            <DynamicPrice
              productId={product.product_id}
              fallbackPrice={product.selling_price}
              basePrice={product.base_price}
              onPriceLoad={(price) => setLatestPrice(price)} // ✅ capture price
            />
          </div>

          <p><b>Description</b></p>
          <p>{product.description}</p>

          <p><b>Stock:</b> {product.stock_left}</p>

          <div className={styles.quantityControls}>
            <button onClick={decreaseQty} disabled={quantity <= 1}>-</button>
            <span className={styles.quantity}>{quantity}</span>
            <button onClick={increaseQty} disabled={quantity >= product.stock_left}>+</button>
          </div>

          <button
            className={styles.button}
            onClick={() =>
              addToCart({
                ...product,
                dynamicPrice: latestPrice ?? product.selling_price, // ✅ pass dynamicPrice
                quantity,
              })
            }
            disabled={product.stock_left < 1 || latestPrice === null}
          >
            {product.stock_left < 1
              ? 'Out of Stock'
              : latestPrice === null
              ? 'Loading Price...'
              : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
