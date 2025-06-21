// // import React, { useEffect, useState } from 'react';

// // function DynamicPrice({ productId }) {
// //   const [priceInfo, setPriceInfo] = useState(null);

// //   useEffect(() => {
// //     async function fetchPrice() {
// //       try {
// //         const res = await fetch(`http://localhost:5000/api/pricing/${productId}`);
// //         const data = await res.json();
// //         setPriceInfo(data);
// //       } catch (err) {
// //         console.error('Error fetching price info:', err);
// //       }
// //     }

// //     fetchPrice();
// //   }, [productId]);

// //   if (!priceInfo) return <p>Loading...</p>;

// //   const { basePrice, finalPrice, discountPercent } = priceInfo;

// //   return (
// //     <div>
// //       {discountPercent > 0 ? (
// //         <div>
// //           <p style={{ textDecoration: 'line-through', color: 'gray' }}>₹{basePrice}</p>
// //           <p style={{ color: 'red', fontWeight: 'bold' }}>₹{finalPrice}</p>
// //           <span style={{ backgroundColor: '#ffd700', padding: '4px', borderRadius: '4px' }}>
// //             {discountPercent}% OFF
// //           </span>
// //         </div>
// //       ) : (
// //         <p>Price: ₹{finalPrice}</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default DynamicPrice;






// import React, { useEffect, useState } from 'react';

// function DynamicPrice({ productId }) {
//   const [priceInfo, setPriceInfo] = useState(null);

//   useEffect(() => {
//     async function fetchPrice() {
//       try {
//         const res = await fetch(`http://localhost:5000/api/pricing/${productId}`);
//         const data = await res.json();
//         setPriceInfo(data);
//       } catch (err) {
//         console.error('Error fetching price:', err);
//       }
//     }

//     fetchPrice();
//   }, [productId]);

//   if (!priceInfo) return <p>Loading...</p>;

//   const { basePrice, finalPrice, discountPercent } = priceInfo;

//   return (
//     <div>
//       {discountPercent > 0 ? (
//         <div>
//           <p style={{ textDecoration: 'line-through' }}>₹{basePrice}</p>
//           <p style={{ color: 'red', fontWeight: 'bold' }}>₹{finalPrice}</p>
//           <span style={{ backgroundColor: '#ffd700', padding: '4px' }}>
//             {discountPercent}% OFF
//           </span>
//         </div>
//       ) : (
//         <p>Price: ₹{finalPrice}</p>
//       )}
//     </div>
//   );
// }

// export default DynamicPrice;











// // src/components/DynamicPrice.js
// import React, { useEffect, useState } from "react";

// function DynamicPrice({ productId }) {
//   const [priceData, setPriceData] = useState(null);

//   useEffect(() => {
//     async function fetchPrice() {
//       try {
//         const res = await fetch(`http://localhost:5000/api/pricing/${productId}`);
//         const data = await res.json();
//         setPriceData(data);
//       } catch (err) {
//         console.error("Price fetch failed", err);
//       }
//     }
//     fetchPrice();
//   }, [productId]);

//   if (!priceData) return <p>Loading price...</p>;

//   const { basePrice, finalPrice, discountPercent } = priceData;

//   return (
//     <div>
//       {discountPercent > 0 ? (
//         <>
//           <p style={{ textDecoration: "line-through", color: "#888" }}>
//             ₹{basePrice}
//           </p>
//           <p style={{ color: "#d32f2f", fontWeight: "bold" }}>
//             ₹{finalPrice}
//           </p>
//           <span style={{
//             backgroundColor: "#ffe600",
//             padding: "2px 6px",
//             borderRadius: "4px",
//             fontSize: "0.9rem"
//           }}>
//             {discountPercent}% OFF
//           </span>
//         </>
//       ) : (
//         <p style={{ fontWeight: "bold" }}>₹{finalPrice}</p>
//       )}
//     </div>
//   );
// }

// export default DynamicPrice;












// import React, { useEffect, useState } from "react";

// function DynamicPrice({ productId }) {
//   const [priceData, setPriceData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!productId) return; // skip if no id

//     async function fetchPrice() {
//       try {
//         const res = await fetch(`http://localhost:5000/api/pricing/${productId}`);
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         setPriceData(data);
//       } catch (err) {
//         console.error("Price fetch failed", err);
//         setError(err.message);
//       }
//     }
//     fetchPrice();
//   }, [productId]);

//   if (error) return <p style={{ color: "red" }}>Error loading price</p>;
//   if (!priceData) return <p>Loading price...</p>;

//   const { basePrice, finalPrice, discountPercent } = priceData;

//   return (
//     <div>
//       {discountPercent > 0 ? (
//         <>
//           <p style={{ textDecoration: "line-through", color: "#888", margin: 0 }}>
//             ₹{basePrice}
//           </p>
//           <p style={{ color: "#d32f2f", fontWeight: "bold", margin: 0 }}>
//             ₹{finalPrice}
//           </p>
//           <span
//             style={{
//               backgroundColor: "#ffe600",
//               padding: "2px 6px",
//               borderRadius: "4px",
//               fontSize: "0.9rem",
//             }}
//           >
//             {discountPercent}% OFF
//           </span>
//         </>
//       ) : (
//         <p style={{ fontWeight: "bold", margin: 0 }}>₹{finalPrice}</p>
//       )}
//     </div>
//   );
// }

// export default DynamicPrice;





// import React, { useEffect, useState } from "react";

// function DynamicPrice({ productId }) {
//   const [priceData, setPriceData] = useState(null);
//   const [error, setError] = useState(false);
//   const [fallbackPrice, setFallbackPrice] = useState(null);

//   useEffect(() => {
//     if (!productId) return;

//     const controller = new AbortController();
//     const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

//     async function fetchPrice() {
//       try {
//         const res = await fetch(`http://localhost:5000/api/pricing/${productId}`, {
//           signal: controller.signal,
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         setPriceData(data);
//       } catch (err) {
//         console.error("Price fetch failed", err);
//         setError(true);

//         // Optional: use static fallback if you have access to selling_price
//         const res = await fetch('http://localhost:5000/products');
//         const allProducts = await res.json();
//         const product = allProducts.products.find(p => p.product_id === productId);
//         if (product?.selling_price) {
//           const fallback = (product.selling_price * 0.99).toFixed(2);
//           setFallbackPrice(fallback);
//         }
//       } finally {
//         clearTimeout(timeout);
//       }
//     }

//     fetchPrice();

//     return () => clearTimeout(timeout);
//   }, [productId]);

//   if (fallbackPrice) {
//     return (
//       <div>
//         <p style={{ color: "#d32f2f", fontWeight: "bold", margin: 0 }}>
//           ₹{fallbackPrice}
//         </p>
//         <span
//           style={{
//             backgroundColor: "#ffe600",
//             padding: "2px 6px",
//             borderRadius: "4px",
//             fontSize: "0.9rem",
//             fontWeight: "bold",
//             marginLeft: "8px",
//           }}
//         >
//           1% OFF (fallback)
//         </span>
//       </div>
//     );
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>Failed to load price</p>;
//   }

//   if (!priceData) {
//     return <p>Loading price...</p>;
//   }

//   const { basePrice, finalPrice, discountPercent } = priceData;

//   return (
//     <div>
//       {discountPercent > 0 ? (
//         <>
//           <p style={{ textDecoration: "line-through", color: "#888", margin: 0 }}>
//             ₹{basePrice}
//           </p>
//           <p style={{ color: "#d32f2f", fontWeight: "bold", margin: 0 }}>
//             ₹{finalPrice}
//           </p>
//           <span
//             style={{
//               backgroundColor: "#ffe600",
//               padding: "2px 6px",
//               borderRadius: "4px",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               marginLeft: "8px",
//             }}
//           >
//             {discountPercent}% OFF
//           </span>
//         </>
//       ) : (
//         <p style={{ fontWeight: "bold", margin: 0 }}>₹{finalPrice}</p>
//       )}
//     </div>
//   );
// }

// export default DynamicPrice;




// import React, { useEffect, useState } from "react";

// function DynamicPrice({ productId, fallbackPrice: sellingPrice, basePrice }) {
//   const [priceData, setPriceData] = useState(null);

//   useEffect(() => {
//     if (!productId) return;

//     const controller = new AbortController();
//     const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

//     async function fetchPrice() {
//       try {
//         const res = await fetch(`http://localhost:5000/api/pricing/${productId}`, {
//           signal: controller.signal,
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         setPriceData(data);
//       } catch (err) {
//         console.error("Price fetch failed", err);
        
//         setPriceData({
//           basePrice: parseFloat(basePrice).toFixed(2),
//           finalPrice: (parseFloat(sellingPrice) * 0.99).toFixed(2),
//           discountPercent: 1,
//           fallback: true,
//         });
//       } finally {
//         clearTimeout(timeout);
//       }
//     }

//     fetchPrice();
//     return () => clearTimeout(timeout);
//   }, [productId, sellingPrice, basePrice]);

//   if (!priceData) return <p>Loading price...</p>;

//   const { basePrice: bp, finalPrice, discountPercent, fallback } = priceData;

//   return (
//     <div>
//       {discountPercent > 0 ? (
//         <>
//           <p style={{ textDecoration: "line-through", color: "#888", margin: 0 }}>
//             ₹{bp}
//           </p>
//           <p style={{ color: "#d32f2f", fontWeight: "bold", margin: 0 }}>
//             ₹{finalPrice}
//           </p>
//           <span
//             style={{
//               backgroundColor: "#ffe600",
//               padding: "2px 6px",
//               borderRadius: "4px",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               marginLeft: "8px",
//             }}
//           >
//             {discountPercent}% OFF{fallback ? " (fallback)" : ""}
//           </span>
//         </>
//       ) : (
//         <p style={{ fontWeight: "bold", margin: 0 }}>₹{finalPrice}</p>
//       )}
//     </div>
//   );
// }

// export default DynamicPrice;



// import React, { useEffect, useState } from "react";

// function DynamicPrice({ productId, fallbackPrice: sellingPrice, basePrice }) {
//   const [priceData, setPriceData] = useState(null);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     if (!productId) return;

//     const controller = new AbortController();

//     const fallbackTimer = setTimeout(() => {
//       if (!loaded) {
//         // Fallback after 6 seconds if not loaded
//         setPriceData({
//           basePrice: parseFloat(basePrice).toFixed(2),
//           finalPrice: (parseFloat(sellingPrice) * 0.99).toFixed(2),
//           discountPercent: 1,
//           fallback: true,
//         });
//         controller.abort(); // abort ongoing fetch if any
//       }
//     }, 6000);

//     async function fetchPrice() {
//       try {
//         const res = await fetch(`http://localhost:5000/api/pricing/${productId}`, {
//           signal: controller.signal,
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         setLoaded(true);
//         clearTimeout(fallbackTimer);
//         setPriceData({
//           basePrice: parseFloat(data.basePrice).toFixed(2),
//           finalPrice: parseFloat(data.finalPrice).toFixed(2),
//           discountPercent: data.discountPercent,
//           fallback: false,
//         });
//       } catch (err) {
//         if (!loaded) {
//           console.error("Price fetch failed or timed out", err);
//           setPriceData({
//             basePrice: parseFloat(basePrice).toFixed(2),
//             finalPrice: (parseFloat(sellingPrice) * 0.99).toFixed(2),
//             discountPercent: 1,
//             fallback: true,
//           });
//         }
//       }
//     }

//     fetchPrice();

//     return () => clearTimeout(fallbackTimer);
//   }, [productId, sellingPrice, basePrice, loaded]);

//   if (!priceData) return <p>Loading price...</p>;

//   const { basePrice: bp, finalPrice, discountPercent, fallback } = priceData;

//   return (
//     <div>
//       {discountPercent > 0 ? (
//         <>
//           <p style={{ textDecoration: "line-through", color: "#888", margin: 0 }}>
//             ₹{bp}
//           </p>
//           <p style={{ color: "#d32f2f", fontWeight: "bold", margin: 0 }}>
//             ₹{finalPrice}
//           </p>
//           <span
//             style={{
//               backgroundColor: "#ffe600",
//               padding: "2px 6px",
//               borderRadius: "4px",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               marginLeft: "8px",
//             }}
//           >
//             {discountPercent}% OFF{fallback ? " (fallback)" : ""}
//           </span>
//         </>
//       ) : (
//         <p style={{ fontWeight: "bold", margin: 0 }}>₹{finalPrice}</p>
//       )}
//     </div>
//   );
// }

// export default DynamicPrice;




// // import React, { useEffect, useState } from "react";

// // function DynamicPrice({ productId, fallbackPrice: sellingPrice, basePrice }) {
// //   const [priceData, setPriceData] = useState(null);

// //   useEffect(() => {
// //     if (!productId) return;

// //     const controller = new AbortController();
// //     let isLoaded = false;

// //     const fallbackTimer = setTimeout(() => {
// //       if (!isLoaded) {
// //         console.warn("⏱ Fallback price triggered for product:", productId);
// //         setPriceData({
// //           basePrice: parseFloat(basePrice).toFixed(2),
// //           finalPrice: (parseFloat(sellingPrice) * 0.99).toFixed(2),
// //           discountPercent: 1,
// //           fallback: true,
// //         });
// //         controller.abort(); // Abort fetch if still ongoing
// //       }
// //     }, 6000); // 6-second fallback

// //     async function fetchPrice() {
// //       try {
// //         const res = await fetch(`http://localhost:5000/api/pricing/${productId}`, {
// //           signal: controller.signal,
// //         });

// //         if (!res.ok) throw new Error(`HTTP ${res.status}`);
// //         const data = await res.json();

// //         isLoaded = true;
// //         clearTimeout(fallbackTimer);

// //         setPriceData({
// //           basePrice: parseFloat(data.basePrice).toFixed(2),
// //           finalPrice: parseFloat(data.finalPrice).toFixed(2),
// //           discountPercent: data.discountPercent,
// //           fallback: false,
// //         });
// //       } catch (err) {
// //         if (!isLoaded) {
// //           console.error("❌ Price fetch failed or timed out for", productId, err);
// //           setPriceData({
// //             basePrice: parseFloat(basePrice).toFixed(2),
// //             finalPrice: (parseFloat(sellingPrice) * 0.99).toFixed(2),
// //             discountPercent: 1,
// //             fallback: true,
// //           });
// //         }
// //       }
// //     }

// //     fetchPrice();

// //     return () => clearTimeout(fallbackTimer);
// //   }, [productId, sellingPrice, basePrice]);

// //   if (!priceData) return <p>Loading price...</p>;

// //   const { basePrice: bp, finalPrice, discountPercent, fallback } = priceData;

// //   return (
// //     <div>
// //       {discountPercent > 0 ? (
// //         <>
// //           <p style={{ textDecoration: "line-through", color: "#888", margin: 0 }}>
// //             ₹{bp}
// //           </p>
// //           <p style={{ color: "#d32f2f", fontWeight: "bold", margin: 0 }}>
// //             ₹{finalPrice}
// //           </p>
// //           <span
// //             style={{
// //               backgroundColor: "#ffe600",
// //               padding: "2px 6px",
// //               borderRadius: "4px",
// //               fontSize: "0.9rem",
// //               fontWeight: "bold",
// //               marginLeft: "8px",
// //             }}
// //           >
// //             {discountPercent}% OFF{fallback ? " (fallback)" : ""}
// //           </span>
// //         </>
// //       ) : (
// //         <p style={{ fontWeight: "bold", margin: 0 }}>₹{finalPrice}</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default DynamicPrice;




// // import React, { useEffect, useState } from "react";

// // function DynamicPrice({ productId, fallbackPrice: sellingPrice, basePrice }) {
// //   const [priceData, setPriceData] = useState(null);

// //   useEffect(() => {
// //     if (!productId) return;

// //     const controller = new AbortController();
// //     let isLoaded = false;

// //     const fallbackTimer = setTimeout(() => {
// //       if (!isLoaded) {
// //         console.warn("⏱ Fallback price triggered for product:", productId);
// //         setPriceData({
// //           basePrice: parseFloat(basePrice).toFixed(2),
// //           finalPrice: (parseFloat(sellingPrice) * 0.99).toFixed(2),
// //           discountPercent: 1,
// //           fallback: true,
// //         });
// //         controller.abort(); // abort fetch if still pending
// //       }
// //     }, 6000);

// //     async function fetchPrice() {
// //       try {
// //         const res = await fetch(`http://localhost:5000/api/pricing/${productId}`, {
// //           signal: controller.signal,
// //         });
// //         if (!res.ok) throw new Error(`HTTP error ${res.status}`);
// //         const data = await res.json();
// //         isLoaded = true;
// //         clearTimeout(fallbackTimer);

// //         setPriceData({
// //           basePrice: parseFloat(data.basePrice).toFixed(2),
// //           finalPrice: parseFloat(data.finalPrice).toFixed(2),
// //           discountPercent: data.discountPercent,
// //           fallback: false,
// //         });
// //       } catch (err) {
// //         if (!isLoaded) {
// //           console.error("❌ Price fetch failed or timed out for", productId, err);
// //           setPriceData({
// //             basePrice: parseFloat(basePrice).toFixed(2),
// //             finalPrice: (parseFloat(sellingPrice) * 0.99).toFixed(2),
// //             discountPercent: 1,
// //             fallback: true,
// //           });
// //         }
// //       }
// //     }

// //     fetchPrice();

// //     return () => {
// //       clearTimeout(fallbackTimer);
// //       controller.abort();
// //     };
// //   }, [productId, sellingPrice, basePrice]);

// //   if (!priceData) return <p>Loading price...</p>;

// //   const { basePrice: bp, finalPrice, discountPercent, fallback } = priceData;

// //   // Debug log to track rendered prices
// //   console.log(`DynamicPrice for ${productId}:`, priceData);

// //   return (
// //     <div>
// //       {discountPercent > 0 ? (
// //         <>
// //           <p style={{ textDecoration: "line-through", color: "#888", margin: 0 }}>
// //             ₹{bp}
// //           </p>
// //           <p style={{ color: "#d32f2f", fontWeight: "bold", margin: 0 }}>
// //             ₹{finalPrice}
// //           </p>
// //           <span
// //             style={{
// //               backgroundColor: "#ffe600",
// //               padding: "2px 6px",
// //               borderRadius: "4px",
// //               fontSize: "0.9rem",
// //               fontWeight: "bold",
// //               marginLeft: "8px",
// //             }}
// //           >
// //             {discountPercent}% OFF{fallback ? " (fallback)" : ""}
// //           </span>
// //         </>
// //       ) : (
// //         <p style={{ fontWeight: "bold", margin: 0 }}>₹{finalPrice}</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default DynamicPrice;




// // import React, { useEffect, useState } from "react";

// // function DynamicPrice({ productId }) {
// //   const [priceData, setPriceData] = useState(null);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     if (!productId) return;

// //     // Simple fetch without timeout or fallback
// //     fetch(`http://localhost:5000/api/pricing/${productId}?_=${Date.now()}`) // cache-busting
// //       .then((res) => {
// //         if (!res.ok) throw new Error(`HTTP error ${res.status}`);
// //         return res.json();
// //       })
// //       .then((data) => {
// //         setPriceData(data);
// //         setError(null);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setPriceData(null);
// //       });
// //   }, [productId]);

// //   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
// //   if (!priceData) return <p>Loading price for {productId}...</p>;

// //   return (
// //     <div>
// //       <p>Base Price: ₹{priceData.basePrice}</p>
// //       <p>Final Price: ₹{priceData.finalPrice}</p>
// //       <p>Discount: {priceData.discountPercent}%</p>
// //     </div>
// //   );
// // }

// // export default DynamicPrice;


// import React, { useEffect, useState } from "react";

// function DynamicPrice({ productId }) {
//   const [priceData, setPriceData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!productId) return;

//     let isMounted = true;
//     const controller = new AbortController();

//     // Timeout to abort fetch if it hangs >5 seconds
//     const timeoutId = setTimeout(() => {
//       controller.abort();
//       if (isMounted) setError("Request timed out");
//     }, 5000);

//     console.log(`Fetching price for productId=${productId}`);

//     fetch(`http://localhost:5000/api/pricing/${productId}`, {
//       signal: controller.signal,
//     })
//       .then((res) => {
//         clearTimeout(timeoutId);
//         if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         if (!isMounted) return;
//         console.log("Received price data:", data);
//         setPriceData(data);
//         setError(null);
//       })
//       .catch((err) => {
//         if (!isMounted) return;
//         console.error("Fetch error:", err.message);
//         setError(err.message);
//         setPriceData(null);
//       });

//     return () => {
//       isMounted = false;
//       clearTimeout(timeoutId);
//       controller.abort();
//     };
//   }, [productId]);

//   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
//   if (!priceData) return <p>Loading price for {productId}...</p>;

//   return (
//     <div>
//       <p>Base Price: ₹{priceData.basePrice}</p>
//       <p>Final Price: ₹{priceData.finalPrice}</p>
//       <p>Discount: {priceData.discountPercent}%</p>
//     </div>
//   );
// }

// export default DynamicPrice;



// import React, { useEffect, useState } from "react";

// function DynamicPrice({ productId, fallbackPrice, basePrice }) {
//   const [priceData, setPriceData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!productId) return;

//     let isMounted = true;
//     const controller = new AbortController();

//     // Timeout fallback after 6 seconds
//     const timeoutId = setTimeout(() => {
//       controller.abort();
//       if (isMounted) {
//         console.warn("⏱ Fallback price triggered:", productId);
//         setError("Timeout. Showing fallback.");
//         setPriceData({
//           basePrice: parseFloat(basePrice).toFixed(2),
//           finalPrice: (parseFloat(fallbackPrice) * 0.99).toFixed(2),
//           discountPercent: 1,
//           fallback: true,
//         });
//       }
//     }, 6000);

//     console.log(`🔄 Fetching price for: ${productId}`);

   

//     fetch(`/api/pricing/${productId}`, {
//       signal: controller.signal,
//     })
//       .then((res) => {
//         clearTimeout(timeoutId);
//         if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         if (!isMounted) return;
//         console.log("✅ Received pricing data:", data);
//         setPriceData({
//           basePrice: parseFloat(data.basePrice).toFixed(2),
//           finalPrice: parseFloat(data.finalPrice).toFixed(2),
//           discountPercent: data.discountPercent,
//           fallback: false,
//         });
//         setError(null);
//       })
//       .catch((err) => {
//         if (!isMounted) return;
//         console.error("❌ Price fetch error:", err.message);
//         setError(err.message);
//         setPriceData({
//           basePrice: parseFloat(basePrice).toFixed(2),
//           finalPrice: (parseFloat(fallbackPrice) * 0.99).toFixed(2),
//           discountPercent: 1,
//           fallback: true,
//         });
//       });

//     return () => {
//       isMounted = false;
//       clearTimeout(timeoutId);
//       controller.abort();
//     };
//   }, [productId, fallbackPrice, basePrice]);

//   if (!priceData) return <p>Loading price for {productId}...</p>;
//   const { basePrice: bp, finalPrice, discountPercent, fallback } = priceData;

//   return (
//     <div>
//       {error && <p style={{ color: "orange", fontSize: "0.9rem" }}>⚠ {error}</p>}
//       {discountPercent > 0 ? (
//         <>
//           <p style={{ textDecoration: "line-through", color: "#888", margin: 0 }}>
//             ₹{bp}
//           </p>
//           <p style={{ color: "#d32f2f", fontWeight: "bold", margin: 0 }}>
//             ₹{finalPrice}
//           </p>
//           <span
//             style={{
//               backgroundColor: fallback ? "#ffd6d6" : "#ffe600",
//               padding: "2px 6px",
//               borderRadius: "4px",
//               fontSize: "0.85rem",
//               fontWeight: "bold",
//               marginLeft: "8px",
//             }}
//           >
//             {discountPercent}% OFF {fallback ? "(fallback)" : ""}
//           </span>
//         </>
//       ) : (
//         <p style={{ fontWeight: "bold", margin: 0 }}>₹{finalPrice}</p>
//       )}
//     </div>
//   );
// }

// export default DynamicPrice;



import React, { useEffect, useState } from "react";

function DynamicPrice({ productId, fallbackPrice, basePrice, onPriceLoad }) {
  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    let isMounted = true;
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
      if (isMounted) {
        console.warn("⏱ Fallback price triggered:", productId);
        const fallbackFinal = (parseFloat(fallbackPrice) * 0.99).toFixed(2);
        setError("Timeout. Showing fallback.");
        setPriceData({
          basePrice: parseFloat(basePrice).toFixed(2),
          finalPrice: fallbackFinal,
          discountPercent: 1,
          fallback: true,
        });

        if (onPriceLoad) onPriceLoad(parseFloat(fallbackFinal));
      }
    }, 6000);

    console.log(`🔄 Fetching price for: ${productId}`);

    fetch(`/api/pricing/${productId}`, {
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        console.log("✅ Received pricing data:", data);
        const finalPrice = parseFloat(data.finalPrice).toFixed(2);
        setPriceData({
          basePrice: parseFloat(data.basePrice).toFixed(2),
          finalPrice,
          discountPercent: data.discountPercent,
          fallback: false,
        });
        setError(null);

        if (onPriceLoad) onPriceLoad(parseFloat(finalPrice));
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("❌ Price fetch error:", err.message);
        setError(err.message);
        const fallbackFinal = (parseFloat(fallbackPrice) * 0.99).toFixed(2);
        setPriceData({
          basePrice: parseFloat(basePrice).toFixed(2),
          finalPrice: fallbackFinal,
          discountPercent: 1,
          fallback: true,
        });

        if (onPriceLoad) onPriceLoad(parseFloat(fallbackFinal));
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [productId, fallbackPrice, basePrice, onPriceLoad]);

  if (!priceData) return <p>Loading price for {productId}...</p>;

  const { basePrice: bp, finalPrice, discountPercent, fallback } = priceData;

  return (
    <div>
      {error && <p style={{ color: "orange", fontSize: "0.9rem" }}>⚠ {error}</p>}
      {discountPercent > 0 ? (
        <>
          <p style={{ textDecoration: "line-through", color: "#888", margin: 0 }}>
            ₹{bp}
          </p>
          <p style={{ color: "#d32f2f", fontWeight: "bold", margin: 0 }}>
            ₹{finalPrice}
          </p>
          <span
            style={{
              backgroundColor: fallback ? "#ffd6d6" : "#ffe600",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "0.85rem",
              fontWeight: "bold",
              marginLeft: "8px",
            }}
          >
            {discountPercent}% OFF {fallback ? "(fallback)" : ""}
          </span>
        </>
      ) : (
        <p style={{ fontWeight: "bold", margin: 0 }}>₹{finalPrice}</p>
      )}
    </div>
  );
}

export default DynamicPrice;
