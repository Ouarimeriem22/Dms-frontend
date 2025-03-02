
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDocument, updateDocument } from '../../store/documentSlice';
import './DocumentForm.css';

function DocumentForm({ document, onClose }) {
  const dispatch = useDispatch();
  const isEditing = !!document;
  const currentUser = useSelector(state => state.auth.user);
  
  const [formData, setFormData] = useState({
    title: document?.title || '',
    description: document?.description || '',
    content: document?.content || '',
    category: document?.category || 'other',
  });
  
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
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
      documentData.id = Date.now(); // Generate a temporary ID
      documentData.createdAt = new Date().toISOString();
      dispatch(addDocument(documentData));
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
      
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">{isEditing ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
}

export default DocumentForm;
