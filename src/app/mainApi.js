import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = 'http://localhost:5000/api';
export const base = 'http://localhost:5000'

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
  endpoints: (builder) => ({})
});