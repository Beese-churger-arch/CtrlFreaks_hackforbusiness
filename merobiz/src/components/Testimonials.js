// import React from 'react';

// const Testimonials = ({ testimonials }) => {
//   return (
//     <section className="testimonials">
//       <h2>What Our Customers Say</h2>
//       <p className="section-subtitle">Don't just take our word for it</p>
      
//       <div className="testimonial-grid">
//         {testimonials.map(testimonial => (
//           <div key={testimonial.id} className="testimonial-card">
//             <div className="rating">
//               {[...Array(testimonial.rating)].map((_, i) => (
//                 <span key={i}>★</span>
//               ))}
//             </div>
//             <p className="testimonial-text">"{testimonial.text}"</p>
//             <div className="testimonial-author">
//               <strong>{testimonial.name}</strong>
//               <span>{testimonial.company}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;



// import React from 'react';
import React, { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const Testimonials = ({ testimonials }) => {
  const { accessibilityOn } = useAccessibility();
  const [focusedCard, setFocusedCard] = useState(null);

  // Speak text aloud
  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="testimonials" aria-label="Customer testimonials">
      <h2 tabIndex={accessibilityOn ? 0 : -1} onFocus={() => speak("What Our Customers Say")}>
        What Our Customers Say
      </h2>
      <p 
        className="section-subtitle" 
        tabIndex={accessibilityOn ? 0 : -1}
        onFocus={() => speak("Don't just take our word for it")}
      >
        Don't just take our word for it
      </p>
      
      <div className="testimonial-grid">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id} 
            className={`testimonial-card ${focusedCard === index && accessibilityOn ? 'focused' : ''}`}
            tabIndex={accessibilityOn ? 0 : -1}
            onMouseEnter={() => accessibilityOn && speak(
              `${testimonial.name} from ${testimonial.company} says: ${testimonial.text}`
            )}
            onFocus={() => {
              setFocusedCard(index);
              accessibilityOn && speak(
                `${testimonial.name} from ${testimonial.company} says: ${testimonial.text}`
              );
            }}
            aria-label={`Testimonial from ${testimonial.name} at ${testimonial.company}`}
          >
            <div className="rating" aria-hidden="true">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonial-author">
              <strong>{testimonial.name}</strong>
              <span>{testimonial.company}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
