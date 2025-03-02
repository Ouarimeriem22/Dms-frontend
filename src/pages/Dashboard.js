
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username}!</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Users</h3>
          <p className="stat-value">24</p>
          <Link to="/users" className="card-link">Manage Users</Link>
        </div>
        <div className="stat-card">
          <h3>Documents</h3>
          <p className="stat-value">105</p>
          <Link to="/documents" className="card-link">Manage Documents</Link>
        </div>
        <div className="stat-card">
          <h3>Recent Activity</h3>
          <p className="stat-value">12</p>
          <Link to="/documents" className="card-link">View Activity</Link>
        </div>
      </div>
      <div className="dashboard-recent">
        <div className="recent-section">
          <h2>Recent Documents</h2>
          <ul className="recent-list">
            <li>Annual Report 2023</li>
            <li>Project Proposal - Marketing Campaign</li>
            <li>Customer Survey Results</li>
            <li>Employee Handbook v2</li>
          </ul>
        </div>
        <div className="recent-section">
          <h2>Recent Users</h2>
          <ul className="recent-list">
            <li>John Smith (joined yesterday)</li>
            <li>Sarah Johnson (joined 3 days ago)</li>
            <li>Michael Brown (joined 5 days ago)</li>
            <li>Emily Davis (joined 1 week ago)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
