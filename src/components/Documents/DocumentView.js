import React from 'react';
import './DocumentView.css';

function DocumentView({ document, onClose }) {
  if (!document) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="document-view">
      <h2>Document Details</h2>

      <div className="document-details">
        <div className="detail-row">
          <div className="detail-label">Title:</div>
          <div className="detail-value">{document.title}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Category:</div>
          <div className="detail-value">
            <span className={`category-badge category-${document.category}`}>{document.category}</span>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Created By:</div>
          <div className="detail-value">{document.createdBy}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Created At:</div>
          <div className="detail-value">{formatDate(document.createdAt)}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Description:</div>
          <div className="detail-value">{document.description}</div>
        </div>
      </div>

      <h3>Document Content</h3>
      <div className="document-content">
        {document.content}
      </div>

      <div className="actions">
        <button className="btn-back" onClick={onClose}>Back to Documents</button>
      </div>
    </div>
  );
}

export default DocumentView;