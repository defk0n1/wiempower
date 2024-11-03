import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const incidentsAdapter = createEntityAdapter({})

const initialState = incidentsAdapter.getInitialState()

export const incidentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getIncidents: builder.query({
            query: () => ({
                url: '/',
                method: 'GET',

                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            // transformResponse: responseData => {
            //     const loadedIncidents = responseData.map(incident => {
            //         const coords = incident.location
            //         incident.location = new google.maps.LatLng(coords[1],coords[0])
            //         return incident
            //     });
            //     return incidentsAdapter.setAll(initialState, loadedIncidents)
            // },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Incident', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Incident', id }))
                    ]
                } else return [{ type: 'Incident', id: 'LIST' }]
            }
        }),
        
    
        addNewIncident: builder.mutation({
            query: incidentData => ({
                url: '/',
                method: 'POST',
                body: {
                    ...incidentData,
                }
            }),
            invalidatesTags: [
                { type: 'Incident', id: "LIST" }
            ]
        }),
       
        

    }),
})

export const {
    useGetIncidentsQuery,
    useAddNewIncidentMutation,
} = incidentsApiSlice

