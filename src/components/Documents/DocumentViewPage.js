import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DocumentViewPage.css'; // Import CSS for styling

const DocumentViewPage = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/documents/${id}`);
        setDocument(response.data);
      } catch (err) {
        setError('Error fetching document');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!document) return <div>No document found</div>;

  return (
    <div className="document-view">
      <div className="document-view-header">
        <h2>{document.title}</h2>
        <div className="document-details">
          <div className="detail-row">
            <span className="detail-label">Category:</span>
            <span className="detail-value">{document.category}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Description:</span>
            <span className="detail-value">{document.description}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Created By:</span>
            <span className="detail-value">{document.createdBy}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Created At:</span>
            <span className="detail-value">{document.createdAt}</span>
          </div>
        </div>
      </div>

      {/* Display the content of the document */}
      <div className="document-content">
        <h3>Content:</h3>
        <p>{document.content}</p> {/* Displaying the content */}
      </div>

      {/* Display the PDF */}
      <div className="pdf-container">
        <iframe 
          src={document.fileUrl} 
          width="100%" 
          height="600px" 
          title={document.title}
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default DocumentViewPage;