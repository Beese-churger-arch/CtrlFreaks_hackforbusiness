// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="sales-footer">
//       <div className="footer-content">
//         <div className="footer-section">
//           <h4>Product</h4>
//           <ul>
//             <li><a href="/features">Features</a></li>
//             <li><a href="/pricing">Pricing</a></li>
//             <li><a href="/integrations">Integrations</a></li>
//             <li><a href="/updates">Updates</a></li>
//           </ul>
//         </div>
        
//         <div className="footer-section">
//           <h4>Resources</h4>
//           <ul>
//             <li><a href="/blog">Blog</a></li>
//             <li><a href="/guides">Guides</a></li>
//             <li><a href="/webinars">Webinars</a></li>
//             <li><a href="/help">Help Center</a></li>
//           </ul>
//         </div>
        
//         <div className="footer-section">
//           <h4>Company</h4>
//           <ul>
//             <li><a href="/about">About Us</a></li>
//             <li><a href="/careers">Careers</a></li>
//             <li><a href="/contact">Contact Us</a></li>
//             <li><a href="/press">Press</a></li>
//           </ul>
//         </div>
        
//         <div className="footer-section">
//           <h4>Connect With Us</h4>
//           <div className="social-links">
//             {/* <a href="/facebook"><img src="facebook-icon.png" alt="Facebook" /></a>
//             <a href="/twitter"><img src="twitter-icon.png" alt="Twitter" /></a>
//             <a href="/linkedin"><img src="linkedin-icon.png" alt="LinkedIn" /></a>
//             <a href="/youtube"><img src="youtube-icon.png" alt="YouTube" /></a> */}
//           </div>
//           <div className="newsletter">
//             <input type="email" placeholder="Your email address" />
//             <button>Subscribe</button>
//           </div>
//         </div>
//       </div>
      
//       <div className="footer-bottom">
//         <p>© 2023 SalesPro. All rights reserved.</p>
//         <div className="legal-links">
//           <a href="/privacy">Privacy Policy</a>
//           <a href="/terms">Terms of Service</a>
//           <a href="/cookies">Cookie Policy</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const Footer = () => {
  const { accessibilityOn } = useAccessibility();
  
  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <footer className="sales-footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Product</h4>
          <ul>
            {["Features", "Pricing", "Integrations", "Updates"].map((item, index) => (
              <li key={index}>
                <a 
                  href={`/${item.toLowerCase()}`}
                  tabIndex={accessibilityOn ? 0 : -1}
                  onFocus={() => speak(item)}
                  onMouseEnter={() => accessibilityOn && speak(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            {["Blog", "Guides", "Webinars", "Help Center"].map((item, index) => (
              <li key={index}>
                <a 
                  href={`/${item.toLowerCase()}`}
                  tabIndex={accessibilityOn ? 0 : -1}
                  onFocus={() => speak(item)}
                  onMouseEnter={() => accessibilityOn && speak(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            {["About Us", "Careers", "Contact Us", "Press"].map((item, index) => (
              <li key={index}>
                <a 
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  tabIndex={accessibilityOn ? 0 : -1}
                  onFocus={() => speak(item)}
                  onMouseEnter={() => accessibilityOn && speak(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            {/* Social icons would go here */}
          </div>
          <div className="newsletter">
            <input 
              type="email" 
              placeholder="Your email address"
              aria-label="Your email address"
              onFocus={() => accessibilityOn && speak("Email input for newsletter")}
            />
            <button
              onFocus={() => accessibilityOn && speak("Subscribe button")}
              onMouseEnter={() => accessibilityOn && speak("Subscribe button")}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2023 SalesPro. All rights reserved.</p>
        <div className="legal-links">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
            <a 
              key={index}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              tabIndex={accessibilityOn ? 0 : -1}
              onFocus={() => speak(item)}
              onMouseEnter={() => accessibilityOn && speak(item)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
