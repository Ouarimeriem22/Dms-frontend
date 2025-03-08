import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    }
  }
});

export const { login, logout, setError, updateUserProfile } = authSlice.actions;

// Mock login function for simulating API calls
export const loginUser = (credentials) => async (dispatch) => {
  try {
    // In a real app, this would be an API call
    const mockUsers = [
      { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' },
      { id: 2, username: 'user', password: 'user123', role: 'user', name: 'Regular User' }
    ];

    const user = mockUsers.find(u => 
      u.username === credentials.username && 
      u.password === credentials.password
    );

    if (user) {
      // Remove password before storing in state
      const { password, ...userWithoutPassword } = user;
      dispatch(login(userWithoutPassword));
      return { success: true };
    } else {
      dispatch(setError('Invalid username or password'));
      return { success: false };
    }
  } catch (error) {
    dispatch(setError(error.message || 'Login failed'));
    return { success: false };
  }
};

export default authSlice.reducer;