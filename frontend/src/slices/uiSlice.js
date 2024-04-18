/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannelId: '1',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveChannel(state, { payload }) {
      state.activeChannelId = payload;
    },
  },
});

export const { setActiveChannel } = uiSlice.actions;
export default uiSlice.reducer;
