/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: null,
  status: 'initial',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state) => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        const authTokenObject = JSON.parse(authToken);
        state.loggedIn = true;
        state.authToken = authTokenObject.token;
        state.username = authTokenObject.username;
      }
    },
    login: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state, { payload }) => {
      state.status = 'pending';
      state.loggedIn = true;
      state.authToken = payload.token;
      state.username = payload.username;
      localStorage.setItem('authToken', JSON.stringify(payload));
    },
    logout: (state) => {
      state.loggedIn = false;
      state.authToken = '';
      state.username = '';
      localStorage.setItem('authToken', '');
    },
    loginError: (state, { payload }) => {
      state.loggedIn = false;
      state.authToken = '';
      state.username = '';
      state.error = payload;
      state.status = 'error';
    },
  },
});

export const {
  checkAuth,
  login,
  loginSuccess,
  logout,
  loginError,
} = authSlice.actions;

export default authSlice.reducer;
