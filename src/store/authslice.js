import { createSlice } from "@reduxjs/toolkit";

const track = {
    status: false,
    userdata: null,
    phoneuserid: null,
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
        },

        phonelog: (state,action)=>{
            state.phoneuserid = action.payload
        }

    }
})

export const {login, logout, phonelog} = authslice.actions;
export default authslice.reducer;