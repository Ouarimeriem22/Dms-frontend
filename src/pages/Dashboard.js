
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../store/userSlice';
import { fetchDocuments } from '../store/documentSlice';
import './Dashboard.css';

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users.users);
  const documents = useSelector((state) => state.documents.documents || []);
  const username = user?.username || 'Guest';
  
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchDocuments());
  }, [dispatch]);
  
  // Get recent users (last 4)
  const recentUsers = [...users].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 4);
  
  // Get recent documents (if available)
  const recentDocs = documents.slice(0, 4);
  
  // Calculate recent activity (simplified example - could be more complex in real app)
  const recentActivity = recentUsers.length + recentDocs.length;
  
  // Format relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  };
  
  return (
    <div className="dashboard-container">
      <h1>Welcome, {username}!</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Users</h3>
          <p className="stat-value">{users.length}</p>
          <Link to="/users" className="card-link">Manage Users</Link>
        </div>
        <div className="stat-card">
          <h3>Documents</h3>
          <p className="stat-value">{documents.length}</p>
          <Link to="/documents" className="card-link">Manage Documents</Link>
        </div>
        <div className="stat-card">
          <h3>Recent Activity</h3>
          <p className="stat-value">{recentActivity}</p>
          <Link to="/documents" className="card-link">View Activity</Link>
        </div>
      </div>
      <div className="dashboard-recent">
        <div className="recent-section">
          <h2>Recent Documents</h2>
          <ul className="recent-list">
            {recentDocs.length > 0 ? (
              recentDocs.map(doc => (
                <li key={doc.id}>{doc.title || doc.name}</li>
              ))
            ) : (
              <li>No recent documents</li>
            )}
          </ul>
        </div>
        <div className="recent-section">
          <h2>Recent Users</h2>
          <ul className="recent-list">
            {recentUsers.length > 0 ? (
              recentUsers.map(user => (
                <li key={user.id}>{user.name} (joined {getRelativeTime(user.createdAt)})</li>
              ))
            ) : (
              <li>No recent users</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
