
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API functions
const mockFetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'John Smith', email: 'john@example.com', role: 'admin', createdAt: '2023-01-15T10:30:00Z' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'user', createdAt: '2023-02-20T14:45:00Z' },
        { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'user', createdAt: '2023-03-10T09:15:00Z' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'viewer', createdAt: '2023-04-05T11:20:00Z' },
        { id: 5, name: 'David Wilson', email: 'david@example.com', role: 'admin', createdAt: '2023-05-18T16:30:00Z' },
      ]);
    }, 1000);
  });
};

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await mockFetchUsers();
    return response;
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user) => {
    // In a real app, this would be an API call
    return user;
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user) => {
    // In a real app, this would be an API call
    return user;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    // In a real app, this would be an API call
    return userId;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add user
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
