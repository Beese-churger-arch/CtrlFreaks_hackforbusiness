import React, { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import {
  FaUserTie,
  FaAddressBook,
  FaChartLine,
  FaChartPie,
  FaMobileAlt,
  FaPuzzlePiece
} from 'react-icons/fa';

const Features = () => {
  const { accessibilityOn } = useAccessibility();
  const [focusedFeature, setFocusedFeature] = useState(null);

  const features = [
    {
      title: 'Fraud Detection',
      description:
        'Identifies suspicious or deceptive user behavior using data analysis and AI to prevent financial or security risks.',
      icon: <FaUserTie size={40} color="#1976d2" />
    },
    {
      title: 'Receipt Processing',
      description:
        'Uses OCR and AI to automatically extract, categorize, and analyze data from receipts for accounting or expense tracking.',
      icon: <FaAddressBook size={40} color="#1976d2" />
    },
    {
      title: 'Dynamic Discounts',
      description:
        'Monitor deals and trends using Google Trends API to get the best price for the given product.',
      icon: <FaChartLine size={40} color="#1976d2" />
    },
    {
      title: 'Advanced Reporting',
      description:
        'Generate detailed reports and dashboards to track performance and identify opportunities.',
      icon: <FaChartPie size={40} color="#1976d2" />
    },
    {
      title: 'Mobile Access',
      description:
        'Access your sales data anywhere with our fully-featured mobile applications.',
      icon: <FaMobileAlt size={40} color="#1976d2" />
    },
    {
      title: 'Integrations',
      description:
        'Connect with your favorite tools through our extensive integration library.',
      icon: <FaPuzzlePiece size={40} color="#1976d2" />
    }
  ];

  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="features" aria-label="Product features">
      <h2
        tabIndex={accessibilityOn ? 0 : -1}
        onFocus={() => speak('Everything You Need to Boost Sales')}
      >
        Everything You Need to Boost Sales
      </h2>
      <p
        className="section-subtitle"
        tabIndex={accessibilityOn ? 0 : -1}
        onFocus={() =>
          speak('Our platform provides all the tools your sales team needs to succeed')
        }
      >
        Our platform provides all the tools your sales team needs to succeed
      </p>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-card ${
              focusedFeature === index && accessibilityOn ? 'focused' : ''
            }`}
            tabIndex={accessibilityOn ? 0 : -1}
            onMouseEnter={() =>
              accessibilityOn && speak(`${feature.title}: ${feature.description}`)
            }
            onFocus={() => {
              setFocusedFeature(index);
              accessibilityOn && speak(`${feature.title}: ${feature.description}`);
            }}
            aria-label={`Feature: ${feature.title}. ${feature.description}`}
          >
            <div className="feature-icon" aria-hidden="true">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;