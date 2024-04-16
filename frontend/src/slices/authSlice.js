/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  status: 'initial',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state) => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        state.loggedIn = true;
      }
    },
    login: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state, { payload }) => {
      state.status = 'pending';
      state.loggedIn = true;
      localStorage.setItem('authToken', payload.token);
    },
    logout: (state) => {
      state.loggedIn = false;
      localStorage.setItem('authToken', '');
    },
    loginError: (state, { payload }) => {
      state.loggedIn = false;
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
