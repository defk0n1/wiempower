import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    credentials: 'include', 
})



export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['Incident'],
    endpoints: (builder) => ({}),
})