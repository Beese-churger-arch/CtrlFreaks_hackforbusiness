import React from 'react';

const Testimonials = ({ testimonials }) => {
  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <p className="section-subtitle">Don't just take our word for it</p>
      
      <div className="testimonial-grid">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="rating">
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