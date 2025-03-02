
import React from 'react';
import Navbar from '../components/Layout/Navbar';
import DocumentsList from '../components/Documents/DocumentsList';

function Documents() {
  return (
    <div className="page-container">
      <Navbar />
      <main className="page-content">
        <DocumentsList />
      </main>
    </div>
  );
}

export default Documents;
