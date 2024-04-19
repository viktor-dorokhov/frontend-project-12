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

export const { setActiveChannel, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
