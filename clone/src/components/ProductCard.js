
// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./css/ProductCard.module.css";
// import DynamicPrice from "./DynamicPrice";


// function ProductCard({ product, addToCart }) {
//   const productId = product.product_id || product.id;
//   const image = product.image || product.img;
//   const productName = product.product_name || product.name;

//   if (!productId) {
//     console.warn("⚠️ Missing product_id in:", product);
//     return null;
//   }

//   return (
//     <div className={styles.card}>
//       <Link to={`/product/${productId}`}>
//         <img
//           src={image || "/fallback.jpg"}
//           alt={productName || "Product image"}
//           className={styles.image}
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = "/fallback.jpg";
//           }}
//         />
//       </Link>

//       <h3 className={styles.name}>{productName}</h3>

//       <div className={styles.prices}>
//         <DynamicPrice
//           productId={productId}
//           fallbackPrice={product.selling_price || product.price}
//           basePrice={product.base_price || product.price}
//         />
//       </div>
// {/* 
//       <button className={styles.button} onClick={() => addToCart(product)}>
//         Add to Cart
//       </button> */}
//       <button
//   className={styles.button}
//   onClick={() => addToCart(product)}
// >
//   Add to Cart
// </button>

//     </div>
//   );
// }

// export default ProductCard;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/ProductCard.module.css";
import DynamicPrice from "./DynamicPrice";

function ProductCard({ product, addToCart }) {
  const [latestPrice, setLatestPrice] = useState(null);

  const productId = product.product_id || product.id;
  const image = product.image || product.img;
  const productName = product.product_name || product.name;

  if (!productId) {
    console.warn("⚠️ Missing product_id in:", product);
    return null;
  }

  return (
    <div className={styles.card}>
      <Link to={`/product/${productId}`}>
        <img
          src={image || "/fallback.jpg"}
          alt={productName || "Product image"}
          className={styles.image}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback.jpg";
          }}
        />
      </Link>

      <h3 className={styles.name}>{productName}</h3>

      <div className={styles.prices}>
        <DynamicPrice
          productId={productId}
          fallbackPrice={product.selling_price || product.price}
          basePrice={product.base_price || product.price}
          onPriceLoad={(price) => setLatestPrice(price)} // <- capture dynamic price
        />
      </div>

      <button
        className={styles.button}
        onClick={() =>
          addToCart({
            ...product,
            dynamicPrice: latestPrice,
            image,
            product_name: productName,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
