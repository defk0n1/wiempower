import { configureStore } from "@reduxjs/toolkit";
import fetchIncidents from "./slices/IncidentsSlice"

import { apiSlice } from './slices/apiSlice'


const store = configureStore({
    reducer: {
        incidents : fetchIncidents,
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});


export default store;