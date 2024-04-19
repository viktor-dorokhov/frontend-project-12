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
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: id,
        method: 'PATCH',
        body: { name },
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
