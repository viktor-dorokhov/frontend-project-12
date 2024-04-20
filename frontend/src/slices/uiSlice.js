/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { channelsApi } from '../services/channelsApi';

export const defaultChannelId = '1';

const initialState = {
  activeChannelId: defaultChannelId,
  modal: {
    active: null,
    data: null,
  },
  language: localStorage.getItem('language') || 'ru',
  colorTheme: localStorage.getItem('colorTheme') || 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveChannel(state, { payload }) {
      state.activeChannelId = payload;
    },
    openModal(state, { payload }) {
      state.modal.active = payload.modalName;
      state.modal.data = payload.data;
    },
    closeModal(state) {
      state.modal.active = null;
    },
    setLanguage(state, { payload }) {
      state.language = payload;
      localStorage.setItem('language', payload);
    },
    setColorTheme(state, { payload }) {
      state.colorTheme = payload;
      localStorage.setItem('colorTheme', payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, action) => {
        state.activeChannelId = action.payload.id;
      },
    );
  },
});

export const {
  setActiveChannel,
  openModal,
  closeModal,
  setLanguage,
  setColorTheme,
} = uiSlice.actions;
export default uiSlice.reducer;
