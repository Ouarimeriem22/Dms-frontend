import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDocument, updateDocument } from '../../store/documentSlice';
import './DocumentForm.css';

function DocumentForm({ document, onClose }) {
  const dispatch = useDispatch();
  const isEditing = !!document;
  const currentUser = useSelector(state => state.auth.user);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: document?.title || '',
    description: document?.description || '',
    content: document?.content || '',
    category: document?.category || 'other',
    file: null,
    fileName: document?.fileName || '',
    fileType: document?.fileType || '',
    fileSize: document?.fileSize || 0,
    fileUrl: document?.fileUrl || ''
  });
  
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear the error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    // Create a local URL for the file preview
    const fileUrl = URL.createObjectURL(file);
    
    setFormData(prev => ({
      ...prev,
      file,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileUrl,
      // If it's a text file, we can show the content
      content: file.type.startsWith('text/') ? '' : prev.content
    }));
    
    // If it's a text file, read the content
    if (file.type.startsWith('text/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          content: event.target.result
        }));
      };
      reader.readAsText(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    // Check if we have either content or a file
    if (!formData.content.trim() && !formData.file && !formData.fileUrl) {
      newErrors.content = 'Either document content or a file is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    const documentData = {
      ...formData,
      createdBy: currentUser.username,
    };
    
    if (!isEditing) {
      dispatch(addDocument(documentData)); // ID is handled in the slice
    } else {
      dispatch(updateDocument({ ...document, ...documentData }));
    }
    
    onClose();
  };

  return (
    <form className="document-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Document' : 'Add New Document'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <div className="error-message">{errors.description}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="report">Report</option>
          <option value="proposal">Proposal</option>
          <option value="contract">Contract</option>
          <option value="policy">Policy</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={errors.content ? 'error' : ''}
          rows="8"
        ></textarea>
        {errors.content && <div className="error-message">{errors.content}</div>}
      </div>
      
      <div className="form-group file-upload">
        <label htmlFor="file">File</label>
        <input
          type="file"
          id="file"
          name="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />
        <button type="button" onClick={handleFileButtonClick} className="btn-file">
          {formData.file ? `Change File` : `Browse File`}
        </button>
        {formData.file && <div>Selected File: {formData.fileName}</div>}
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">{isEditing ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
}

export default DocumentForm;