/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';

const getInitialState = () => {
  const authInfo = localStorage.getItem('authInfo');
  const defaultObject = { status: 'initial' };
  if (authInfo) {
    const authInfoObject = JSON.parse(authInfo);
    return {
      ...defaultObject,
      username: authInfoObject.username,
      authToken: authInfoObject.token,
      loggedIn: true,
    };
  }
  return {
    ...defaultObject,
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
      .addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
        state.status = 'loading';
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.status = 'pending';
        state.loggedIn = true;
        state.authToken = action.payload.token;
        state.username = action.payload.username;
        localStorage.setItem('authInfo', JSON.stringify(action.payload));
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.error = action.payload;
        state.status = 'error';
      })
      .addMatcher(authApi.endpoints.signup.matchPending, (state, action) => {
        state.status = 'loading';
      })
      .addMatcher(authApi.endpoints.signup.matchFulfilled, (state, action) => {
        state.status = 'pending';
        state.loggedIn = true;
        state.authToken = action.payload.token;
        state.username = action.payload.username;
        localStorage.setItem('authInfo', JSON.stringify(action.payload));
      })
      .addMatcher(authApi.endpoints.signup.matchRejected, (state, action) => {
        state.error = action.payload;
        state.status = 'error';
      })
  },
})

export const { logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
