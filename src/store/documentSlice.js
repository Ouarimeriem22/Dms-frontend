import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Add axios for making HTTP requests

// Async thunks
export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async () => {
    const response = await axios.get('http://localhost:5000/api/documents'); // Update the URL as needed
    return response.data;
  }
);

export const addDocument = createAsyncThunk(
  'documents/addDocument',
  async (document) => {
    return document; // In a real app, this would be an API call
  }
);

export const updateDocument = createAsyncThunk(
  'documents/updateDocument',
  async (document) => {
    return document; // In a real app, this would be an API call
  }
);

export const deleteDocument = createAsyncThunk(
  'documents/deleteDocument',
  async (documentId) => {
    return documentId; // In a real app, this would be an API call
  }
);

const documentSlice = createSlice({
  name: 'documents',
  initialState: {
    documents: [],
    loading: false,
    error: null,
    nextId: 1, // Start from 1
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch documents
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
        // Set nextId based on the highest existing ID
        if (action.payload.length > 0) {
          state.nextId = Math.max(...action.payload.map(doc => doc.id)) + 1;
        }
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add document
      .addCase(addDocument.fulfilled, (state, action) => {
        const newDocument = { ...action.payload, id: state.nextId };
        state.documents.push(newDocument);
        state.nextId += 1; // Increment the nextId for the next document
      })
      // Update document
      .addCase(updateDocument.fulfilled, (state, action) => {
        const index = state.documents.findIndex(doc => doc.id === action.payload.id);
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
      })
      // Delete document
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.documents = state.documents.filter(doc => doc.id !== action.payload);
      });
  },
});

export default documentSlice.reducer;