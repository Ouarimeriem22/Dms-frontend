import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import documentReducer from './documentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    documents: documentReducer,
  },
});

export default store;