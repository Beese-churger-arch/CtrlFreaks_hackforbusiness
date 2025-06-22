import React from 'react';
import Sidebar from './Sidebar';
import Footer from '../Footer';
import { Routes, Route } from 'react-router-dom';
import DynamicPricing from './DynamicPricing';
import ReceiptProcessing from './ReceiptProcessing';
import FraudDetection from './FraudDetection';
import BatchFraudDetection from './BatchFraudDetection';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Tooltip, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer
} from 'recharts';

const sampleData = [
  { name: 'Jan', sales: 4000, users: 2400, frauds: 100 },
  { name: 'Feb', sales: 3000, users: 2210, frauds: 80 },
  { name: 'Mar', sales: 5000, users: 2290, frauds: 60 },
  { name: 'Apr', sales: 4780, users: 2000, frauds: 70 },
  { name: 'May', sales: 5890, users: 2181, frauds: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => (
  <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh' }}>
    <Sidebar />
    <div className="dashboard-content" style={{ flex: 1, padding: '2rem' }}>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Sales Overview</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                
                <div className="chart-card">
                  <h3>Sales Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-card">
                  <h3>Fraud Detections</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="frauds" fill="#f56565" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-card">
                  <h3>User Growth</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="users" fill="#48bb78" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-card">
                  <h3>Sales Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sampleData}
                        dataKey="sales"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {sampleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          }
        />
        <Route path="pricing" element={<DynamicPricing />} />
        <Route path="receipt" element={<ReceiptProcessing />} />
        <Route path="fraud" element={<FraudDetection />} />
        <Route path="fraud-batch" element={<BatchFraudDetection />} />
      </Routes>
      <Footer />
    </div>
  </div>
);

export default Dashboard;
