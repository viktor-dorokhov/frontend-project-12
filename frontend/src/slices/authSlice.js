/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';

const getInitialState = () => {
  const authInfo = localStorage.getItem('authInfo');
  if (authInfo) {
    const authInfoObject = JSON.parse(authInfo);
    return {
      username: authInfoObject.username,
      authToken: authInfoObject.token,
      loggedIn: true,
    };
  }
  return {
    username: null,
    authToken: null,
    loggedIn: false,
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedIn = false;
      state.authToken = null;
      state.username = null;
      localStorage.removeItem('authInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.loggedIn = true;
        state.authToken = action.payload.token;
        state.username = action.payload.username;
        localStorage.setItem('authInfo', JSON.stringify(action.payload));
      })
      .addMatcher(authApi.endpoints.signup.matchFulfilled, (state, action) => {
        state.loggedIn = true;
        state.authToken = action.payload.token;
        state.username = action.payload.username;
        localStorage.setItem('authInfo', JSON.stringify(action.payload));
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
