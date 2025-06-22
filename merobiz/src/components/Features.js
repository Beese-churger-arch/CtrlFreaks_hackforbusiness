import React from 'react';

const Features = () => {
  return (
    <section className="features">
      <h2>Everything You Need to Boost Sales</h2>
      <p className="section-subtitle">Our platform provides all the tools your sales team needs to succeed</p>

      <div className="feature-grid">
        {/* Repeat this block for each feature */}
        <div className="feature-card">
          <div className="feature-icon">
            {/* <img src="lead-icon.png" alt="Lead Management" /> */}
          </div>
          <h3>Lead Management</h3>
          <p>Track and manage leads through the entire sales pipeline with customizable stages and automation</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            {/* <img src="contact-icon.png" alt="Contact Management" /> */}
          </div>
          <h3>Contact Management</h3>
          <p>Organize all your customer information in one place with detailed profiles and interaction history</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            {/* <img src="deal-icon.png" alt="Deal Tracking" /> */}
          </div>
          <h3>Deal Tracking</h3>
          <p>Monitor deals and forecast revenue with precision using our visual pipeline management</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            {/* <img src="report-icon.png" alt="Reporting" /> */}
          </div>
          <h3>Advanced Reporting</h3>
          <p>Generate detailed reports and dashboards to track performance and identify opportunities</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            {/* <img src="mobile-icon.png" alt="Mobile Access" /> */}
          </div>
          <h3>Mobile Access</h3>
          <p>Access your sales data anywhere with our fully-featured mobile applications</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            {/* <img src="integration-icon.png" alt="Integrations" /> */}
          </div>
          <h3>Integrations</h3>
          <p>Connect with your favorite tools through our extensive integration library</p>
        </div>
      </div>
    </section>
  )
}

export default Features;