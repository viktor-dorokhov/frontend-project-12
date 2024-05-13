/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  status: 'initial',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // all reducers for removed middlewares
    fetchMessages: (state) => {
      state.status = 'loading';
    },
    fetchMessagesSuccess: (state, { payload }) => {
      state.status = 'loaded';
      state.messages = payload;
    },
    fetchMessagesError: (state, { payload }) => {
      // state.messages = [];
      state.error = payload;
      state.status = 'error';
    },
    addMessage: (state) => {
      state.status = 'loading';
    },
    addMessageSuccess: (state, { payload }) => {
      state.status = 'loaded';
      state.messages = state.messages.concat(payload);
    },
    addMessageError: (state, { payload }) => {
      // state.messages = [];
      state.error = payload;
      state.status = 'error';
    },
  },
});

export const {
  fetchMessages,
  fetchMessagesSuccess,
  fetchMessagesError,
  addMessage,
  addMessageSuccess,
  addMessageError,
} = messagesSlice.actions;

export default messagesSlice.reducer;
