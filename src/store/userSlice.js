import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Add axios for making HTTP requests

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await axios.get('http://localhost:5000/api/users'); // Update the URL as needed
    return response.data;
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user) => {
    return user; // In a real app, this would be an API call
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user) => {
    return user; // In a real app, this would be an API call
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    return userId; // In a real app, this would be an API call
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
    nextId: 3, // Start from 3 since you have 2 mock users
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
        // Set nextId based on the highest existing ID
        if (action.payload.length > 0) {
          state.nextId = Math.max(...action.payload.map(user => user.id)) + 1;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add user
      .addCase(addUser.fulfilled, (state, action) => {
        const newUser = { ...action.payload, id: state.nextId };
        state.users.push(newUser);
        state.nextId += 1; // Increment the nextId for the next user
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