import { configureStore } from '@reduxjs/toolkit'
import { weather_api } from './service/weather'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [weather_api.reducerPath] : weather_api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weather_api.middleware)
})

setupListeners(store.dispatch)