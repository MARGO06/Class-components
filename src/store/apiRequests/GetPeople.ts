import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ALL_PEOPLE_URL = 'https://swapi.dev/api/people/';

export const apiRequest = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: ALL_PEOPLE_URL }),
  endpoints: (builder) => ({
    getPerson: builder.query({
      query: (inputValue: string) => `?search=${inputValue}`,
    }),
    getPeopleOnPage: builder.query({
      query: ({ inputValue, page }: { inputValue: string; page: number }) =>
        `?search=${inputValue}&page=${page}`,
    }),
  }),
});

export const { useGetPersonQuery, useGetPeopleOnPageQuery } = apiRequest;
