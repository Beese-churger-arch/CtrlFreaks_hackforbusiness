import React, { useEffect, useRef, useState, useCallback } from "react";
import "../css/AccessibilityConfirm.css";
import { useAccessibility } from '../contexts/AccessibilityContext';

function AccessibilityConfirm() {
  const [show, setShow] = useState(true);
  const [focusedButton, setFocusedButton] = useState(0);
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);
  const { setAccessibilityOn } = useAccessibility();

  const handleChoice = (on) => {
    setAccessibilityOn(on);
    setShow(false);
  };

  // ✅ useCallback here to avoid ESLint warning
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        setFocusedButton(0);
        e.preventDefault();
        break;
      case 'ArrowRight':
        setFocusedButton(1);
        e.preventDefault();
        break;
      case 'Enter':
        handleChoice(focusedButton === 0);
        e.preventDefault();
        break;
      case 'Escape':
        setShow(false);
        e.preventDefault();
        break;
      default:
        break;
    }
  }, [focusedButton, setAccessibilityOn]);

  useEffect(() => {
    if (show) {
      document.addEventListener('keydown', handleKeyDown);
      if (focusedButton === 0 && yesButtonRef.current) {
        yesButtonRef.current.focus();
      } else if (noButtonRef.current) {
        noButtonRef.current.focus();
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [show, focusedButton, handleKeyDown]); // ✅ include handleKeyDown in deps

  return (
    <div>
      {show && (
        <div
          className="ac-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
          aria-describedby="accessibility-desc"
          tabIndex={-1}
        >
          <div className="ac-modal">
            <h2 id="accessibility-title">Accessibility Mode</h2>
            <p id="accessibility-desc">
              Do you want to turn Accessibility ON?
            </p>
            <div className="ac-buttons-container">
              <button
                ref={yesButtonRef}
                onClick={() => handleChoice(true)}
                className={`ac-btn ac-btn-primary ${focusedButton === 0 ? 'focused' : ''}`}
                aria-label="Yes, turn accessibility on"
              >
                Yes
              </button>
              <button
                ref={noButtonRef}
                onClick={() => handleChoice(false)}
                className={`ac-btn ac-btn-secondary ${focusedButton === 1 ? 'focused' : ''}`}
                aria-label="No, keep accessibility off"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessibilityConfirm;
