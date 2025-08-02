import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './utils/toast.js';

// Components
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Pages
import Dashboard from './pages/Dashboard';
import ReportIssue from './pages/ReportIssue';
import IssueDetail from './pages/IssueDetail';
import MapView from './pages/MapView';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

// Context
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <LocationProvider>
        <div className="min-h-screen bg-gray-50">
          <Toaster />
          
          {/* Mobile sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className={sidebarOpen ? 'main-content' : 'main-content'} style={{ marginLeft: window.innerWidth > 1024 ? '16rem' : '0' }}>
            <Navbar setSidebarOpen={setSidebarOpen} />
            
            <main className="py-6">
              <div className="container">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/report" element={<ReportIssue />} />
                  <Route path="/issue/:id" element={<IssueDetail />} />
                  <Route path="/map" element={<MapView />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
