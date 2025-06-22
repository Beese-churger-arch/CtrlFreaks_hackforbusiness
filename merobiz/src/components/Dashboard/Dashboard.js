// import React, { useState, useMemo, useCallback } from 'react';
// import Sidebar from './Sidebar';
// import Footer from '../Footer';
// import { Routes, Route } from 'react-router-dom';
// import DynamicPricing from './DynamicPricing';
// import ReceiptProcessing from './ReceiptProcessing';
// import FraudDetection from './FraudDetection';
// import BatchFraudDetection from './BatchFraudDetection';
// import { useAccessibility } from '../contexts/AccessibilityContext';

// import {
//   LineChart, Line, BarChart, Bar, PieChart, Pie, 
//   Cell, Tooltip, CartesianGrid, XAxis, YAxis, Legend, 
//   ResponsiveContainer
// } from 'recharts';

// // Sample data
// const sampleData = [
//   { name: 'Jan', sales: 4000, users: 2400, frauds: 100 },
//   { name: 'Feb', sales: 3000, users: 2210, frauds: 80 },
//   { name: 'Mar', sales: 5000, users: 2290, frauds: 60 },
//   { name: 'Apr', sales: 4780, users: 2000, frauds: 70 },
//   { name: 'May', sales: 5890, users: 2181, frauds: 90 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// // // Memoized chart components
// // const SalesChart = React.memo(({ data }) => (
// //   <ResponsiveContainer width="100%" height={300}>
// //     <LineChart data={data}>
// //       <CartesianGrid strokeDasharray="3 3" />
// //       <XAxis dataKey="name" />
// //       <YAxis />
// //       <Tooltip />
// //       <Legend />
// //       <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
// //     </LineChart>
// //   </ResponsiveContainer>
// // ));

// // const FraudChart = React.memo(({ data }) => (
// //   <ResponsiveContainer width="100%" height={300}>
// //     <BarChart data={data}>
// //       <CartesianGrid strokeDasharray="3 3" />
// //       <XAxis dataKey="name" />
// //       <YAxis />
// //       <Tooltip />
// //       <Legend />
// //       <Bar dataKey="frauds" fill="#f56565" radius={[4, 4, 0, 0]} />
// //     </BarChart>
// //   </ResponsiveContainer>
// // ));

// // const UsersChart = React.memo(({ data }) => (
// //   <ResponsiveContainer width="100%" height={300}>
// //     <BarChart data={data}>
// //       <CartesianGrid strokeDasharray="3 3" />
// //       <XAxis dataKey="name" />
// //       <YAxis />
// //       <Tooltip />
// //       <Legend />
// //       <Bar dataKey="users" fill="#48bb78" radius={[4, 4, 0, 0]} />
// //     </BarChart>
// //   </ResponsiveContainer>
// // ));

// // const DistributionChart = React.memo(({ data }) => (
// //   <ResponsiveContainer width="100%" height={300}>
// //     <PieChart>
// //       <Pie
// //         data={data}
// //         dataKey="sales"
// //         nameKey="name"
// //         cx="50%"
// //         cy="50%"
// //         outerRadius={80}
// //         innerRadius={40}
// //         paddingAngle={5}
// //         label
// //       >
// //         {data.map((_, index) => (
// //           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //         ))}
// //       </Pie>
// //       <Tooltip />
// //       <Legend layout="vertical" verticalAlign="middle" align="right" />
// //     </PieChart>
// //   </ResponsiveContainer>
// // ));
// const FraudChart = React.memo(({ data, speak }) => (
//   <ResponsiveContainer width="100%" height={300}>
//     <BarChart data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar
//         dataKey="frauds"
//         fill="#f56565"
//         radius={[4, 4, 0, 0]}
//         onMouseEnter={(entry) => {
//           if (entry && entry.value) {
//             speak(`Frauds in ${entry.payload.name}: ${entry.value}`);
//           }
//         }}
//       />
//     </BarChart>
//   </ResponsiveContainer>
// ));

// const UsersChart = React.memo(({ data, speak }) => (
//   <ResponsiveContainer width="100%" height={300}>
//     <BarChart data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar
//         dataKey="users"
//         fill="#48bb78"
//         radius={[4, 4, 0, 0]}
//         onMouseEnter={(entry) => {
//           if (entry && entry.value) {
//             speak(`Users in ${entry.payload.name}: ${entry.value}`);
//           }
//         }}
//       />
//     </BarChart>
//   </ResponsiveContainer>
// ));

// const DistributionChart = React.memo(({ data, speak }) => (
//   <ResponsiveContainer width="100%" height={300}>
//     <PieChart>
//       <Pie
//         data={data}
//         dataKey="sales"
//         nameKey="name"
//         cx="50%"
//         cy="50%"
//         outerRadius={80}
//         innerRadius={40}
//         paddingAngle={5}
//         label
//         onMouseEnter={(entry) => {
//           if (entry && entry.value) {
//             speak(`Sales in ${entry.name}: ${entry.value}`);
//           }
//         }}
//       >
//         {data.map((_, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//       <Tooltip />
//       <Legend layout="vertical" verticalAlign="middle" align="right" />
//     </PieChart>
//   </ResponsiveContainer>
// ));



// // Sidebar width constants
// const SIDEBAR_WIDTH_COLLAPSED = 72;
// const SIDEBAR_WIDTH_EXPANDED = 180;

// // const Dashboard = () => {const { accessibilityOn } = useAccessibility();

// // const speak = (text) => {
// //   if (accessibilityOn && window.speechSynthesis) {
// //     window.speechSynthesis.cancel();
// //     const utterance = new SpeechSynthesisUtterance(text);
// //     window.speechSynthesis.speak(utterance);
// //   }
// // };

// const Dashboard = () => {
//   const { accessibilityOn } = useAccessibility();

//   const speak = (text) => {
//     if (accessibilityOn && window.speechSynthesis) {
//       window.speechSynthesis.cancel();
//       const utterance = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   const [expanded, setExpanded] = useState(false);
//   const toggleSidebar = useCallback(() => setExpanded(prev => !prev), []);

//   // const chartComponents = useMemo(() => [
//   //   { title: 'Sales Over Time', component: <SalesChart data={sampleData} /> },
//   //   { title: 'Fraud Detections', component: <FraudChart data={sampleData} /> },
//   //   { title: 'User Growth', component: <UsersChart data={sampleData} /> },
//   //   { title: 'Sales Distribution', component: <DistributionChart data={sampleData} /> }
//   // ], [sampleData]);

//   const chartComponents = useMemo(() => [
//   { title: 'Sales Over Time', component: <SalesChart data={sampleData} /> },
//   { title: 'Fraud Detections', component: <FraudChart data={sampleData} speak={speak} /> },
//   { title: 'User Growth', component: <UsersChart data={sampleData} speak={speak} /> },
//   { title: 'Sales Distribution', component: <DistributionChart data={sampleData} speak={speak} /> }
// ], [sampleData, speak]);

//   return (
//     <div className="dashboard-layout" style={{ 
//       display: 'flex', 
//       flexDirection: 'column', 
//       minHeight: '100vh',
//       backgroundColor: '#f5f7fa'
//     }}>
//       <div style={{ display: 'flex', flex: 1 }}>
//         <Sidebar expanded={expanded} toggleSidebar={toggleSidebar} />
//         <div 
//           className="dashboard-content" 
//           style={{ 
//             flex: 1, 
//             padding: '2rem',
//             marginLeft: expanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED,
//             transition: 'margin-left 0.2s cubic-bezier(.4,0,.2,1)'
//           }}
//         >
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <div>
//                   <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>Sales Dashboard</h1>
//                   <div style={{ 
//                     display: 'grid', 
//                     gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
//                     gap: '2rem'
//                   }}>
//                     {chartComponents.map((chart, index) => (
//                       <div 
//                         key={index} 
//                         className="chart-card"
//                         style={{
//                           background: 'white',
//                           borderRadius: '12px',
//                           padding: '1.5rem',
//                           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//                         }}
//                       >
//                         <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#4a5568' }}>
//                           {chart.title}
//                         </h3>
//                         {chart.component}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               }
//             />
//             <Route path="pricing" element={<DynamicPricing />} />
//             <Route path="receipt" element={<ReceiptProcessing />} />
//             <Route path="fraud" element={<FraudDetection />} />
//             <Route path="fraud-batch" element={<BatchFraudDetection />} />
//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useMemo, useCallback } from 'react';
import Sidebar from './Sidebar';
import Footer from '../Footer';
import { Routes, Route } from 'react-router-dom';
import DynamicPricing from './DynamicPricing';
import ReceiptProcessing from './ReceiptProcessing';
import FraudDetection from './FraudDetection';
import BatchFraudDetection from './BatchFraudDetection';
import { useAccessibility } from '../../contexts/AccessibilityContext';

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  Cell, Tooltip, CartesianGrid, XAxis, YAxis, Legend, 
  ResponsiveContainer
} from 'recharts';

const sampleData = [
  { name: 'Jan', sales: 4000, users: 2400, frauds: 100 },
  { name: 'Feb', sales: 3000, users: 2210, frauds: 80 },
  { name: 'Mar', sales: 5000, users: 2290, frauds: 60 },
  { name: 'Apr', sales: 4780, users: 2000, frauds: 70 },
  { name: 'May', sales: 5890, users: 2181, frauds: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// SalesChart with custom dot and voice feedback
const SalesChart = React.memo(({ data, speak, accessibilityOn }) => {
  const CustomDot = ({ cx, cy, payload }) => (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="#8884d8"
      stroke="#fff"
      strokeWidth={2}
      onMouseEnter={() => {
        if (accessibilityOn) {
          speak(`Sales in ${payload.name}: ${payload.sales}`);
        }
      }}
    />
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          strokeWidth={2}
          dot={<CustomDot />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

// FraudChart with voice
const FraudChart = React.memo(({ data, speak, accessibilityOn }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="frauds"
        fill="#f56565"
        radius={[4, 4, 0, 0]}
        onMouseEnter={(data, index) => {
          if (accessibilityOn) {
            speak(`Frauds in ${data.payload.name}: ${data.payload.frauds}`);
          }
        }}
      />
    </BarChart>
  </ResponsiveContainer>
));

// UsersChart with voice
const UsersChart = React.memo(({ data, speak, accessibilityOn }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="users"
        fill="#48bb78"
        radius={[4, 4, 0, 0]}
        onMouseEnter={(data, index) => {
          if (accessibilityOn) {
            speak(`Users in ${data.payload.name}: ${data.payload.users}`);
          }
        }}
      />
    </BarChart>
  </ResponsiveContainer>
));

// DistributionChart with voice
const DistributionChart = React.memo(({ data, speak, accessibilityOn }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        dataKey="sales"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        innerRadius={40}
        paddingAngle={5}
        label
        onMouseEnter={(data, index) => {
          if (accessibilityOn) {
            speak(`Sales in ${data.name}: ${data.sales}`);
          }
        }}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="vertical" verticalAlign="middle" align="right" />
    </PieChart>
  </ResponsiveContainer>
));

// Dashboard main component
const SIDEBAR_WIDTH_COLLAPSED = 72;
const SIDEBAR_WIDTH_EXPANDED = 180;

const Dashboard = () => {
  const { accessibilityOn } = useAccessibility();

  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const [expanded, setExpanded] = useState(false);
  const toggleSidebar = useCallback(() => setExpanded((prev) => !prev), []);

  const chartComponents = useMemo(
    () => [
      {
        title: 'Sales Over Time',
        component: <SalesChart data={sampleData} speak={speak} accessibilityOn={accessibilityOn} />
      },
      {
        title: 'Fraud Detections',
        component: <FraudChart data={sampleData} speak={speak} accessibilityOn={accessibilityOn} />
      },
      {
        title: 'User Growth',
        component: <UsersChart data={sampleData} speak={speak} accessibilityOn={accessibilityOn} />
      },
      {
        title: 'Sales Distribution',
        component: <DistributionChart data={sampleData} speak={speak} accessibilityOn={accessibilityOn} />
      }
    ],
    [accessibilityOn, speak]
  );

  return (
    <div className="dashboard-layout" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: accessibilityOn ? '#111' : '#f5f7fa',
      color: accessibilityOn ? 'white' : 'inherit'
    }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar expanded={expanded} toggleSidebar={toggleSidebar} />
        <div
          className="dashboard-content"
          style={{
            flex: 1,
            padding: '2rem',
            marginLeft: expanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED,
            transition: 'margin-left 0.2s cubic-bezier(.4,0,.2,1)'
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 style={{ marginBottom: '2rem', color: accessibilityOn ? 'white' : '#2d3748' }}>
                    Sales Dashboard
                  </h1>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem'
                  }}>
                    {chartComponents.map((chart, index) => (
                      <div
                        key={index}
                        className="chart-card"
                        style={{
                          background: accessibilityOn ? '#1a1a1a' : 'white',
                          borderRadius: '12px',
                          padding: '1.5rem',
                          boxShadow: accessibilityOn
                            ? '0 0 10px rgba(255, 255, 255, 0.1)'
                            : '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: accessibilityOn ? 'white' : '#4a5568' }}>
                          {chart.title}
                        </h3>
                        {chart.component}
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
            <Route path="pricing" element={<DynamicPricing />} />
            <Route path="receipt" element={<ReceiptProcessing />} />
            <Route path="fraud" element={<FraudDetection />} />
            <Route path="fraud-batch" element={<BatchFraudDetection />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
