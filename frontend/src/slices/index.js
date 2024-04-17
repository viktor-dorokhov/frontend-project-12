import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import middlewares from '../middlewares';

export default configureStore({
  reducer: {
    authStore: authReducer,
    channelsStore: channelsReducer,
    messagesStore: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});
