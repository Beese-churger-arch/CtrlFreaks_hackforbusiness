

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/Navbar.module.css';

function Navbar({ cartCount, products }) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(query.toLowerCase())
  );

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optionally handle form submission, e.g., navigate or refine search
  };

  const handleResultClick = () => {
    setShowResults(false);
    setQuery('');
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>DarazClone</Link>

      <form className={styles.searchForm} onSubmit={handleSubmit} autoComplete="off">
        <input
          type="search"
          placeholder="Search products…"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)} // delay so click works
          className={styles.searchInput}
        />
        <button type="submit">
          <i className="fas fa-search" />
        </button>

        {showResults && query && (
          <ul className={styles.searchResults}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <li
                  key={product.product_id}
                  onMouseDown={handleResultClick} // onMouseDown prevents blur before click
                  className={styles.searchResultItem}
                >
                  <Link to={`/product/${product.product_id}`}>
                    {product.product_name}
                  </Link>
                </li>
              ))
            ) : (
              <li className={styles.noResults}>No products found</li>
            )}
          </ul>
        )}
      </form>

      <div className={styles.linkGroup}>
        <Link to="/signin">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/cart">
          <i className="fas fa-shopping-cart" /> {cartCount}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
