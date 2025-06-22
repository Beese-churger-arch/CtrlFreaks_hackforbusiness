import React from 'react';

const Integrations = ({ integrations }) => {
  return (
    <section className="integrations">
      <h2>Works With Your Favorite Tools</h2>
      <p className="section-subtitle">Connect with the apps you already use</p>
      
      <div className="integration-grid">
        {integrations.map((integration, index) => (
          <div key={index} className="integration-item">
            {/* <img src={integration.icon} alt={integration.name} /> */}
            <span>{integration.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Integrations;