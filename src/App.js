import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Documents from './pages/Documents';
import DocumentViewPage from './components/Documents/DocumentViewPage.js'; // Import the DocumentViewPage
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/" />} />
        <Route path="/documents" element={isAuthenticated ? <Documents /> : <Navigate to="/" />} />
        <Route path="/documents/view/:id" element={isAuthenticated ? <DocumentViewPage /> : <Navigate to="/" />} /> {/* Updated route for document view */}
      </Routes>
    </div>
  );
}

export default App;