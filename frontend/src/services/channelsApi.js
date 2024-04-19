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
  endpoints: (builder) => ({
    fetchChannels: builder.query({
      query: () => '',
    }),
  }),
});

export const {
  useFetchChannelsQuery,
} = channelsApi;
