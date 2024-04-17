/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  status: 'initial',
  activeId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannels: (state) => {
      state.status = 'loading';
    },
    fetchChannelsSuccess: (state, { payload }) => {
      state.status = 'loaded';
      state.channels = payload;
      if (payload.length && !state.activeId) {
        state.activeId = payload[0].id;
      }
    },
    fetchChannelsError: (state, { payload }) => {
      // state.channels = [];
      state.error = payload;
      state.status = 'error';
    },
    setActiveChannel: (state, { payload }) => {
      state.activeId = payload;
    },
  },
});

export const {
  fetchChannels,
  fetchChannelsSuccess,
  fetchChannelsError,
  setActiveChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
