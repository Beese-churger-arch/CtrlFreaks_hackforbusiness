import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const { accessibilityOn } = useAccessibility();
  const [focusedIndex, setFocusedIndex] = useState(0);

  const menuItems = [
    { label: "Features", path: "/features" },
    { label: "Pricing", path: "/pricing" },
    { label: "Resources", path: "/resources" },
    { label: "Support", path: "/support" },
    { label: "Sign In", path: "/login", type: "button", className: "btn-secondary" },
    { label: "Get Started", path: "/register", type: "button", className: "btn-primary" },
  ];

  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (!accessibilityOn) return;

    const handleKeyDown = (e) => {
      let newIndex = focusedIndex;
      switch (e.key) {
        case 'ArrowRight':
        case 'Tab':
          if (!e.shiftKey) {
            newIndex = (focusedIndex + 1) % menuItems.length;
            setFocusedIndex(newIndex);
            speak(menuItems[newIndex].label);
            e.preventDefault();
          }
          break;
        case 'ArrowLeft':
          newIndex = (focusedIndex - 1 + menuItems.length) % menuItems.length;
          setFocusedIndex(newIndex);
          speak(menuItems[newIndex].label);
          e.preventDefault();
          break;
        case 'Tab':
          if (e.shiftKey) {
            newIndex = (focusedIndex - 1 + menuItems.length) % menuItems.length;
            setFocusedIndex(newIndex);
            speak(menuItems[newIndex].label);
            e.preventDefault();
          }
          break;
        case 'Enter':
          if (menuItems[focusedIndex]) {
            navigate(menuItems[focusedIndex].path);
            speak(`Navigating to ${menuItems[focusedIndex].label}`);
          }
          e.preventDefault();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [accessibilityOn, focusedIndex, menuItems, navigate]);

  const handleFocus = (index, label) => {
    setFocusedIndex(index);
    speak(label);
  };

  return (
    <header className="sales-header">
      <div
        className="logo"
        onClick={() => navigate('/')}
        onMouseEnter={() => accessibilityOn && speak("mero bizz Home")}
        onFocus={() => accessibilityOn && speak("mero bizz Home")}
        tabIndex={0}
        aria-label="mero bizz Home"
        role="button"
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <img
          src="/logo.png"
          alt="merobiz Logo"
          style={{ height: '35px', width: 'auto' }}
          draggable={false}
        />
      </div>

      <button
        className="mobile-menu-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        onMouseEnter={() => accessibilityOn && speak("Mobile menu button")}
        onFocus={() => accessibilityOn && speak("Mobile menu button")}
        aria-label="Toggle mobile menu"
      >
        ☰
      </button>

      <nav className={`sales-nav ${mobileMenuOpen ? 'open' : ''}`}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.label}>
            {item.type === 'button' ? (
              <button
                className={`${item.className} ${focusedIndex === index && accessibilityOn ? 'focused' : ''}`}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => accessibilityOn && speak(item.label)}
                onFocus={() => handleFocus(index, item.label)}
                aria-label={item.label}
                tabIndex={0}
              >
                {item.label}
              </button>
            ) : (
              <a
                href={item.path}
                className={focusedIndex === index && accessibilityOn ? 'focused' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                onMouseEnter={() => accessibilityOn && speak(item.label)}
                onFocus={() => handleFocus(index, item.label)}
                aria-label={item.label}
                tabIndex={0}
              >
                {item.label}
              </a>
            )}
          </React.Fragment>
        ))}
      </nav>
    </header>
  );
};

export default Header;
