import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentDetail = () => {
  const { documentId } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      const response = await axios.get(`http://localhost:5000/api/documents/${documentId}`);
      setDocument(response.data);
    };
    fetchDocument();
  }, [documentId]);

  if (!document) return <div>Loading...</div>;

  return (
    <div>
      <h1>{document.title}</h1>
      <p><strong>Category:</strong> {document.category}</p>
      <p><strong>Description:</strong> {document.description}</p>
      <p><strong>Created By:</strong> {document.createdBy}</p>
      <p><strong>Created At:</strong> {document.createdAt}</p>
      <iframe src={document.fileUrl} width="600" height="400" title={document.title}></iframe>
    </div>
  );
};

export default DocumentDetail;