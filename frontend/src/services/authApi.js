import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: routes.login(),
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: routes.signup(),
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

const { useLoginMutation, useSignupMutation } = authApi;

export {
  useLoginMutation,
  useSignupMutation,
};
