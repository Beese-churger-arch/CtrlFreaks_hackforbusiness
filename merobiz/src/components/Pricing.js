import React from 'react';

const Pricing = ({ pricingPlans, activeTab, setActiveTab }) => {
  return (
    <section className="pricing">
      <h2>Simple, Transparent Pricing</h2>
      <p className="section-subtitle">Choose the plan that fits your business needs</p>
      
      <div className="pricing-toggle">
        <button 
          className={activeTab === 'monthly' ? 'active' : ''}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly Billing
        </button>
        <button 
          className={activeTab === 'annually' ? 'active' : ''}
          onClick={() => setActiveTab('annually')}
        >
          Annual Billing (Save 20%)
        </button>
      </div>
      
      <div className="pricing-grid">
        {(pricingPlans[activeTab] || []).map((plan, index) => (
          <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <h3>{plan.name}</h3>
            <div className="price">
              <span className="amount">{plan.price}</span>
              {plan.pricePeriod && <span className="period">{plan.pricePeriod}</span>}
            </div>
            <ul className="features-list">
              {(plan.features || []).map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className={plan.popular ? 'btn-primary' : 'btn-secondary'}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
