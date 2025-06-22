import React from 'react';

export default function DynamicPricing() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh'
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        Dynamic Pricing Example
      </h2>
      <a
        href="http://localhost:4000"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '1.5rem',
          color: '#6366f1',
          background: '#f1f5f9',
          padding: '1rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}
      >
        👉 Click here to see the Dynamic Pricing Example
      </a>
    </div>
  );
}
