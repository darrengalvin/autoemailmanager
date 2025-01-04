import React from 'react';
import AdminPanel from './components/AdminPanel';
import EmailDashboard from './components/EmailDashboard';
import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <EmailDashboard />
    </Layout>
  );
}