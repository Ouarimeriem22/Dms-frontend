
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API functions
const mockFetchDocuments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { 
          id: 1, 
          title: 'Annual Report 2023', 
          description: 'Financial overview and company performance', 
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl nisl eget ultricies.',
          category: 'report', 
          createdBy: 'John Smith', 
          createdAt: '2023-12-15T10:30:00Z' 
        },
        { 
          id: 2, 
          title: 'Project Proposal - Marketing Campaign', 
          description: 'Proposal for the new marketing campaign Q2', 
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl nisl eget ultricies.',
          category: 'proposal', 
          createdBy: 'Sarah Johnson', 
          createdAt: '2023-11-20T14:45:00Z' 
        },
        { 
          id: 3, 
          title: 'Customer Service Agreement', 
          description: 'Standard agreement for customer service', 
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl nisl eget ultricies.',
          category: 'contract', 
          createdBy: 'Michael Brown', 
          createdAt: '2023-10-10T09:15:00Z' 
        },
        { 
          id: 4, 
          title: 'Employee Handbook v2', 
          description: 'Updated employee policies and procedures', 
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl nisl eget ultricies.',
          category: 'policy', 
          createdBy: 'Emily Davis', 
          createdAt: '2023-09-05T11:20:00Z' 
        },
        { 
          id: 5, 
          title: 'Customer Survey Results', 
          description: 'Analysis of Q4 customer satisfaction survey', 
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl nisl eget ultricies.',
          category: 'report', 
          createdBy: 'David Wilson', 
          createdAt: '2023-08-18T16:30:00Z' 
        },
      ]);
    }, 1000);
  });
};

// Async thunks
export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async () => {
    const response = await mockFetchDocuments();
    return response;
  }
);

export const addDocument = createAsyncThunk(
  'documents/addDocument',
  async (document) => {
    // In a real app, this would be an API call
    return document;
  }
);

export const updateDocument = createAsyncThunk(
  'documents/updateDocument',
  async (document) => {
    // In a real app, this would be an API call
    return document;
  }
);

export const deleteDocument = createAsyncThunk(
  'documents/deleteDocument',
  async (documentId) => {
    // In a real app, this would be an API call
    return documentId;
  }
);

const documentSlice = createSlice({
  name: 'documents',
  initialState: {
    documents: [],
    loading: false,
    error: null,
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
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add document
      .addCase(addDocument.fulfilled, (state, action) => {
        state.documents.push(action.payload);
      })
      // Update document
      .addCase(updateDocument.fulfilled, (state, action) => {
        const index = state.documents.findIndex(document => document.id === action.payload.id);
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
      })
      // Delete document
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.documents = state.documents.filter(document => document.id !== action.payload);
      });
  },
});

export default documentSlice.reducer;
