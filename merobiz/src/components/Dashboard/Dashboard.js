import React, { useState, useMemo, useCallback } from 'react';
import Sidebar from './Sidebar';
import Footer from '../Footer';
import { Routes, Route } from 'react-router-dom';
import DynamicPricing from './DynamicPricing';
import ReceiptProcessing from './ReceiptProcessing';
import FraudDetection from './FraudDetection';
import BatchFraudDetection from './BatchFraudDetection';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  Cell, Tooltip, CartesianGrid, XAxis, YAxis, Legend, 
  ResponsiveContainer
} from 'recharts';

// Sample data
const sampleData = [
  { name: 'Jan', sales: 4000, users: 2400, frauds: 100 },
  { name: 'Feb', sales: 3000, users: 2210, frauds: 80 },
  { name: 'Mar', sales: 5000, users: 2290, frauds: 60 },
  { name: 'Apr', sales: 4780, users: 2000, frauds: 70 },
  { name: 'May', sales: 5890, users: 2181, frauds: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Memoized chart components
const SalesChart = React.memo(({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
));

const FraudChart = React.memo(({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="frauds" fill="#f56565" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
));

const UsersChart = React.memo(({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="users" fill="#48bb78" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
));

const DistributionChart = React.memo(({ data }) => (
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

// Sidebar width constants
const SIDEBAR_WIDTH_COLLAPSED = 72;
const SIDEBAR_WIDTH_EXPANDED = 180;

const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleSidebar = useCallback(() => setExpanded(prev => !prev), []);

  const chartComponents = useMemo(() => [
    { title: 'Sales Over Time', component: <SalesChart data={sampleData} /> },
    { title: 'Fraud Detections', component: <FraudChart data={sampleData} /> },
    { title: 'User Growth', component: <UsersChart data={sampleData} /> },
    { title: 'Sales Distribution', component: <DistributionChart data={sampleData} /> }
  ], [sampleData]);

  return (
    <div className="dashboard-layout" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f5f7fa'
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
                  <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>Sales Dashboard</h1>
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
                          background: 'white',
                          borderRadius: '12px',
                          padding: '1.5rem',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#4a5568' }}>
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
