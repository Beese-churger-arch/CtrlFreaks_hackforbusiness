import React from 'react';
import styles from './css/Footer.module.css';

function Footer() {
  return (

    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h3>DarazClone</h3>
          <p>© 2025 DarazClone. All rights reserved.</p>
        </div>
        <div className={styles.right}>
          <a href="#about">About Us</a>
          <a href="#help">Help Center</a>
          <a href="#terms">Terms & Conditions</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
