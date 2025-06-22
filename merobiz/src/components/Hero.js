// import React from 'react';

// const Hero = () => {
//   return (
//     <section className="hero">
//       <div className="hero-content">
//         <h1>UNIFY YOUR WORKFLOW. ULEASH POTENTIAL.</h1>
//         <p>Manage Today, Scale Tomorrow.</p>
//         <div className="hero-cta">
//           <button className="btn-primary">Start Free Trial</button>
//           <button className="btn-secondary">Watch Demo</button>
//         </div>
//         <div className="trust-badges">
//           <span>A modern day solution for a modern day problem.</span>
//         </div>
//       </div>
//       <div className="hero-image">
//         {/* <img src="sales-dashboard.png" alt="Sales Dashboard" className="dashboard-image" /> */}
//       </div>
//     </section>
//   );
// }

// export default Hero;



import React from 'react';
import Sidebar from './Sidebar';

const Hero = () => {
  return (
    <>
      <Sidebar />
      <section className="hero">
        <div className="hero-content">
          <h1>UNIFY YOUR WORKFLOW. UNLEASH POTENTIAL.</h1>
          <p>Manage Today, Scale Tomorrow.</p>
          <div className="hero-cta">
            <button className="btn-primary">Start Free Trial</button>
            <button className="btn-secondary">Watch Demo</button>
          </div>
          <div className="trust-badges">
            <span>A modern day solution for a modern day problem.</span>
          </div>
        </div>
        <div className="hero-image">
          {/* <img src="sales-dashboard.png" alt="Sales Dashboard" className="dashboard-image" /> */}
        </div>
      </section>
    </>
  );
};

export default Hero;
