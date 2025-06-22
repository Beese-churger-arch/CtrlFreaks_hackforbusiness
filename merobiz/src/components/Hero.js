import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import '../css/hero.css';

const heroLines = [
  "Work feels like home.",
  "Bringing harmony to your business.",
  "Manage with heart, grow with ease.",
  "Your cozy corner for business success.",
];

function TypingHero() {
  const [displayed, setDisplayed] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    let timeout;
    const currentLine = heroLines[lineIdx];
    if (!erasing && charIdx < currentLine.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentLine.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 60);
    } else if (!erasing && charIdx === currentLine.length) {
      timeout = setTimeout(() => setErasing(true), 1200);
    } else if (erasing && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentLine.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, 30);
    } else if (erasing && charIdx === 0) {
      timeout = setTimeout(() => {
        setErasing(false);
        setLineIdx((lineIdx + 1) % heroLines.length);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, erasing, lineIdx]);

  return (
    <h1 className="blinking-cursor" aria-live="polite" tabIndex={-1}>
      {displayed}
      <span aria-hidden="true" className="blinking-cursor">|</span>
    </h1>
  );
}

const Hero = () => {
  return (
    <section className="hero-full-bg" aria-label="Hero section with animated headline and 3D background">
      <div className="spline-bg-wrapper" aria-hidden="true">
        <Spline scene="https://prod.spline.design/WN4rbILutK5iWLms/scene.splinecode" className="spline-bg" />
      </div>

      <div className="hero-fg-content">
        <TypingHero />
        <div className="hero-cta">
          <button className="btn-primary" aria-label="Start Free Trial">Start Free Trial</button>
          <button className="btn-secondary" aria-label="Watch Demo">Watch Demo</button>
        </div>
        <div className="trust-badges">
          {/* Add any trust badges or text here if needed */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
