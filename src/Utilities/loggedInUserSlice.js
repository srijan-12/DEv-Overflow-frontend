import {createSlice} from "@reduxjs/toolkit"

const loggedInUserSlice = createSlice({
    name : "loggedInUserSlice",
    initialState : null,
    reducers:{
        addUser : (state,action)=>{
            return action.payload;
        },
        removeUser : (state, action) =>{
            return null
        }
    }
});

export const {addUser, removeUser} = loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;