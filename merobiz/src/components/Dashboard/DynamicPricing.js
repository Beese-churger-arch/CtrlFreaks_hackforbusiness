// import React from 'react';

// export default function DynamicPricing() {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '60vh'
//       }}
//     >
//       <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
//         Dynamic Pricing Example
//       </h2>
//       <a
//         href="http://localhost:4000"
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{
//           fontSize: '1.5rem',
//           color: '#6366f1',
//           background: '#f1f5f9',
//           padding: '1rem 2rem',
//           borderRadius: '8px',
//           textDecoration: 'none',
//           fontWeight: 'bold',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
//         }}
//       >
//         👉 Click here to see the Dynamic Pricing Example
//       </a>
//     </div>
//   );
// }



// import React from 'react';
// import { useAccessibility } from '../../contexts/AccessibilityContext';

// export default function DynamicPricing() {
//   const { accessibilityOn } = useAccessibility();

//   const speak = (text) => {
//     if (accessibilityOn && window.speechSynthesis) {
//       window.speechSynthesis.cancel();
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.lang = 'en-US';
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '60vh',
//       }}
//     >
//       <h2
//         style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}
//         tabIndex={accessibilityOn ? 0 : -1}
//       >
//         Dynamic Pricing Example
//       </h2>
//       <a
//         href="http://localhost:4000"
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{
//           fontSize: '1.5rem',
//           color: '#6366f1',
//           background: '#f1f5f9',
//           padding: '1rem 2rem',
//           borderRadius: '8px',
//           textDecoration: 'none',
//           fontWeight: 'bold',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//         }}
//         tabIndex={accessibilityOn ? 0 : -1}
//         onFocus={() => speak("Click to open the dynamic pricing example in a new tab")}
//       >
//         👉 Click here to see the Dynamic Pricing Example
//       </a>
//     </div>
//   );
// }
import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

export default function DynamicPricing() {
  const { accessibilityOn } = useAccessibility();

  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <h2
        style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}
        tabIndex={accessibilityOn ? 0 : -1}
        onFocus={() => speak("Dynamic Pricing Example")}
        onBlur={stopSpeaking}
        onMouseEnter={() => speak("Dynamic Pricing Example")}
        onMouseLeave={stopSpeaking}
      >
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
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
        tabIndex={accessibilityOn ? 0 : -1}
        onFocus={() => speak("Click to open the dynamic pricing example in a new tab")}
        onBlur={stopSpeaking}
        onMouseEnter={() => speak("Click to open the dynamic pricing example in a new tab")}
        onMouseLeave={stopSpeaking}
      >
        👉 Click here to see the Dynamic Pricing Example
      </a>
    </div>
  );
}
