import React, { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import '../css/integrations.css';  // <-- import the CSS here

const Integrations = () => {
  const { accessibilityOn } = useAccessibility();
  const [focusedIntegration, setFocusedIntegration] = useState(null);

  const integrations = [
    { 
      name: "Sales",
      svg: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z" stroke="#222" strokeWidth="2" fill="none"/>
          <circle cx="20" cy="20" r="3" stroke="#222" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      name: "Dynamic Discounts",
      svg: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <rect x="10" y="12" width="20" height="16" rx="2" stroke="#222" strokeWidth="2" fill="none"/>
          <path d="M15 28 L20 36 L25 28" stroke="#222" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      name: "Fraud detection",
      svg: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M12 24 Q20 32 28 24" stroke="#222" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      name: "Accounting",
      svg: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M12 12 L12 28" stroke="#222" strokeWidth="2"/>
          <path d="M18 12 L18 28" stroke="#222" strokeWidth="2"/>
          <path d="M24 12 L24 28" stroke="#222" strokeWidth="2"/>
          <path d="M30 12 L30 28" stroke="#222" strokeWidth="2"/>
          <path d="M12 24 L30 24" stroke="#222" strokeWidth="2"/>
        </svg>
      )
    },
    {
      name: "Operations",
      svg: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="14" stroke="#222" strokeWidth="2" fill="none"/>
          <circle cx="20" cy="20" r="4" stroke="#222" strokeWidth="2" fill="none"/>
          <line x1="20" y1="6" x2="20" y2="16" stroke="#222" strokeWidth="2"/>
          <line x1="20" y1="24" x2="20" y2="34" stroke="#222" strokeWidth="2"/>
        </svg>
      )
    },
  ];

  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className={`integration-boxes ${accessibilityOn ? 'accessibility-on' : ''}`}>
      <h2
        tabIndex={accessibilityOn ? 0 : -1}
        onFocus={() => speak("See What Else You Can Do with Merobiz")}
      >
        See What Else You Can Do with Merobiz
      </h2>

      <div className="integration-boxes-grid">
        {integrations.map((integration, index) => (
          <div
            key={index}
            className={`integration-box ${integration.name.toLowerCase().replace(/\s+/g, '-')}`}
            tabIndex={accessibilityOn ? 0 : -1}
            onMouseEnter={() => accessibilityOn && speak(integration.name)}
            onFocus={() => {
              setFocusedIntegration(index);
              accessibilityOn && speak(integration.name);
            }}
            aria-label={`Integration with ${integration.name}`}
          >
            <span className="integration-icon">{integration.svg}</span>
            <span className="integration-label">{integration.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Integrations;
