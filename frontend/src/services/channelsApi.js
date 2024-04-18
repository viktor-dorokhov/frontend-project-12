import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.channels(),
    prepareHeaders: (headers, { getState }) => {
      const { authStore } = getState();
      headers.set('Authorization', `Bearer ${authStore.authToken}`);
      return headers;
    },
  }),
  // tagTypes: ['Channels', 'Messages'],
  endpoints: (builder) => ({
    fetchChannels: builder.query({
      query: () => '',
      // providesTags: ['Channels'],
    }),
  }),
});

export const {
  useFetchChannelsQuery,
} = channelsApi;
