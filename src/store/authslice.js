import { createSlice } from "@reduxjs/toolkit";

const track = {
    status: false,
    userdata: null,
}

const authslice = createSlice({
    name: "authantication",
    initialState: track,
    reducers: {
        login: (state, action)=>{
            state.status = true
            state.userdata = action.payload
        },
        logout: (state)=>{
            state.status = false
            state.userdata = null
        }
    }
})

export const {login, logout} = authslice.actions;
export default authslice.reducer;