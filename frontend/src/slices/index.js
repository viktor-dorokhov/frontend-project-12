import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import middlewares from '../middlewares';

export default configureStore({
  reducer: {
    authStore: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});
