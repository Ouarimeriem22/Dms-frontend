
import React from 'react';
import Navbar from '../components/Layout/Navbar';
import UsersList from '../components/Users/UsersList';

function Users() {
  return (
    <div className="page-container">
      <Navbar />
      <main className="page-content">
        <UsersList />
      </main>
    </div>
  );
}

export default Users;
