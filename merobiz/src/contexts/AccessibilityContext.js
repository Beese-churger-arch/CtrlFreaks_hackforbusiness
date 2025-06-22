// // src/contexts/AccessibilityContext.js
// import React, { createContext, useState, useContext } from 'react';

// const AccessibilityContext = createContext();

// export const AccessibilityProvider = ({ children }) => {
//   const [accessibilityOn, setAccessibilityOn] = useState(false);
  
//   return (
//     <AccessibilityContext.Provider value={{ accessibilityOn, setAccessibilityOn }}>
//       {children}
//     </AccessibilityContext.Provider>
//   );
// };

// export const useAccessibility = () => useContext(AccessibilityContext);
import React, { createContext, useState, useContext, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [accessibilityOn, setAccessibilityOn] = useState(false);
  
  useEffect(() => {
    if (accessibilityOn) {
      document.body.classList.add('accessible-mode');
    } else {
      document.body.classList.remove('accessible-mode');
    }
  }, [accessibilityOn]);

  return (
    <AccessibilityContext.Provider value={{ accessibilityOn, setAccessibilityOn }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
