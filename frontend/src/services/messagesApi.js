import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.messages(),
    prepareHeaders: (headers, { getState }) => {
      const { authStore } = getState();
      headers.set('Authorization', `Bearer ${authStore.authToken}`);
      return headers;
    },
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    fetchMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),

});

export const {
  useFetchMessagesQuery,
  useAddMessageMutation,
} = messagesApi;
