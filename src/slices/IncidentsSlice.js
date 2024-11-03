import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    incidents: null
}

const incidentsSlice = createSlice({
    name: 'incidents',
    initialState,
    reducers: {
        fetchIncidents : ( state , action ) => {
            state.incidents = action.payload 
            

        }
    },
});


export const { fetchIncidents } = incidentsSlice.actions;




export default incidentsSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token