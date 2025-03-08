import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDocuments, deleteDocument } from '../../store/documentSlice';
import DocumentForm from './DocumentForm';
import './DocumentsList.css';

function DocumentsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documents, loading, error } = useSelector((state) => state.documents);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [showForm, setShowForm] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  
  const documentsPerPage = 5;

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  // Sorting logic
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filtering and sorting logic
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = sortedDocuments.slice(indexOfFirstDocument, indexOfLastDocument);
  const totalPages = Math.ceil(sortedDocuments.length / documentsPerPage);

  const handleEdit = (document) => {
    setEditingDocument(document);
    setShowForm(true);
  };

  const handleDelete = (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      dispatch(deleteDocument(documentId));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingDocument(null);
  };
  
  const handleView = (documentId) => {
    navigate(`/documents/view/${documentId}`); // Updated to navigate to the document view page
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return '';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="loading">Loading documents...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="documents-container">
      <div className="documents-header">
        <h1>Documents Management</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>Add New Document</button>
      </div>

      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="report">Report</option>
            <option value="proposal">Proposal</option>
            <option value="contract">Contract</option>
            <option value="policy">Policy</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {showForm && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseForm}>&times;</button>
            <DocumentForm document={editingDocument} onClose={handleCloseForm} />
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="documents-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('id')}>ID{getSortIndicator('id')}</th>
              <th onClick={() => requestSort('title')}>Title{getSortIndicator('title')}</th>
              <th onClick={() => requestSort('category')}>Category{getSortIndicator('category')}</th>
              <th onClick={() => requestSort('createdBy')}>Created By{getSortIndicator('createdBy')}</th>
              <th onClick={() => requestSort('createdAt')}>Created At{getSortIndicator('createdAt')}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDocuments.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No documents found</td>
              </tr>
            ) : (
              currentDocuments.map(doc => (
                <tr key={doc.id}>
                  <td>{doc.id}</td>
                  <td className="document-title">{doc.title}</td>
                  <td><span className={`category-badge category-${doc.category}`}>{doc.category}</span></td>
                  <td>{doc.createdBy}</td>
                  <td>{formatDate(doc.createdAt)}</td>
                  <td className="actions-cell">
                    <button className="btn-view" onClick={() => handleView(doc.id)}>View</button>
                    <button className="btn-edit" onClick={() => handleEdit(doc)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(doc.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DocumentsList;