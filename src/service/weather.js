import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const weather_api = createApi({
    reducerPath: 'weather_api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.weatherapi.com/v1' }),
    endpoints: (builder) => ({
        getWeatherData: builder.query({
            query: (params = {}) => ({
                url: `forecast.json`,
                params: {key: "6a516888abf048c9ae1172936252502" ,...params}
            }),
        }),
        getSearchSuggestions: builder.query({
            query: (params = {}) => ({
                url: 'search.json',
                params: {key: "6a516888abf048c9ae1172936252502", ...params}
            })
        })
    })
})

export const { useGetWeatherDataQuery, useGetSearchSuggestionsQuery } = weather_api