// import React from 'react';

// const Pricing = ({ pricingPlans, activeTab, setActiveTab }) => {
//   return (
//     <section className="pricing">
//       <h2>Simple, Transparent Pricing</h2>
//       <p className="section-subtitle">Choose the plan that fits your business needs</p>
      
//       <div className="pricing-toggle">
//         <button 
//           className={activeTab === 'monthly' ? 'active' : ''}
//           onClick={() => setActiveTab('monthly')}
//         >
//           Monthly Billing
//         </button>
//         <button 
//           className={activeTab === 'annually' ? 'active' : ''}
//           onClick={() => setActiveTab('annually')}
//         >
//           Annual Billing (Save 20%)
//         </button>
//       </div>
      
//       <div className="pricing-grid">
//         {(pricingPlans[activeTab] || []).map((plan, index) => (
//           <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
//             {plan.popular && <div className="popular-badge">Most Popular</div>}
//             <h3>{plan.name}</h3>
//             <div className="price">
//               <span className="amount">{plan.price}</span>
//               {plan.pricePeriod && <span className="period">{plan.pricePeriod}</span>}
//             </div>
//             <ul className="features-list">
//               {(plan.features || []).map((feature, i) => (
//                 <li key={i}>{feature}</li>
//               ))}
//             </ul>
//             <button className={plan.popular ? 'btn-primary' : 'btn-secondary'}>
//               {plan.cta}
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Pricing;


import React, { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const Pricing = ({ pricingPlans, activeTab, setActiveTab }) => {
  const { accessibilityOn } = useAccessibility();
  const [focusedPlan, setFocusedPlan] = useState(null);
  const [focusedTab, setFocusedTab] = useState(0);
  
  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTabKey = (e) => {
    if (!accessibilityOn) return;
    
    if (e.key === 'ArrowRight') {
      setFocusedTab(1);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      setFocusedTab(0);
      e.preventDefault();
    } else if (e.key === 'Enter') {
      setActiveTab(focusedTab === 0 ? 'monthly' : 'annually');
      e.preventDefault();
    }
  };

  return (
    <section className="pricing">
      <h2 
        tabIndex={accessibilityOn ? 0 : -1}
        onFocus={() => speak("Simple, Transparent Pricing")}
      >
        Simple, Transparent Pricing
      </h2>
      <p 
        className="section-subtitle"
        tabIndex={accessibilityOn ? 0 : -1}
        onFocus={() => speak("Choose the plan that fits your business needs")}
      >
        Choose the plan that fits your business needs
      </p>
      
      <div className="pricing-toggle">
        <button 
          className={activeTab === 'monthly' ? 'active' : ''}
          onClick={() => setActiveTab('monthly')}
          tabIndex={accessibilityOn ? 0 : -1}
          onMouseEnter={() => accessibilityOn && speak("Monthly Billing")}
          onFocus={() => {
            setFocusedTab(0);
            accessibilityOn && speak("Monthly Billing");
          }}
          onKeyDown={handleTabKey}
        >
          Monthly Billing
        </button>
        <button 
          className={activeTab === 'annually' ? 'active' : ''}
          onClick={() => setActiveTab('annually')}
          tabIndex={accessibilityOn ? 0 : -1}
          onMouseEnter={() => accessibilityOn && speak("Annual Billing, Save 20%")}
          onFocus={() => {
            setFocusedTab(1);
            accessibilityOn && speak("Annual Billing, Save 20%");
          }}
          onKeyDown={handleTabKey}
        >
          Annual Billing (Save 20%)
        </button>
      </div>
      
      <div className="pricing-grid">
        {(pricingPlans[activeTab] || []).map((plan, index) => (
          <div 
            key={index}
            className={`pricing-card ${plan.popular ? 'popular' : ''} ${focusedPlan === index && accessibilityOn ? 'focused' : ''}`}
            tabIndex={accessibilityOn ? 0 : -1}
            onMouseEnter={() => accessibilityOn && speak(`${plan.name} plan: ${plan.price} ${plan.pricePeriod ? plan.pricePeriod : ''}`)}
            onFocus={() => {
              setFocusedPlan(index);
              accessibilityOn && speak(`${plan.name} plan: ${plan.price} ${plan.pricePeriod ? plan.pricePeriod : ''}`);
            }}
            aria-label={`${plan.name} plan for ${plan.price} ${plan.pricePeriod ? plan.pricePeriod : ''}`}
          >
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
            <button 
              className={plan.popular ? 'btn-primary' : 'btn-secondary'}
              onFocus={() => accessibilityOn && speak(plan.cta)}
              onMouseEnter={() => accessibilityOn && speak(plan.cta)}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  ); 
};

export default Pricing;
