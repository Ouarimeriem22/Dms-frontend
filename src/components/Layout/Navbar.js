
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import './Navbar.css';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">Document Management System</Link>
      </div>
      {isAuthenticated && (
        <>
          <div className="navbar-menu">
            <Link to="/dashboard" className="navbar-item">Dashboard</Link>
            <Link to="/users" className="navbar-item">Users</Link>
            <Link to="/documents" className="navbar-item">Documents</Link>
          </div>
          <div className="navbar-end">
            <span className="user-name">{user?.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
