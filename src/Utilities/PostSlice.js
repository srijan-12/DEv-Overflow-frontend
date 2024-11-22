import { createSlice } from "@reduxjs/toolkit";
const posts = createSlice({
    name : "posts",
    initialState : null,
    reducers:{
        addPost : (state,action)=>{
            return action.payload
        },
        removePost : (state,action)=>{
            return null
        },
        addSinglePost: (state, action) => {
            if (Array.isArray(state)) {
                return [action.payload, ...state];
            } else {
                return [action.payload];
            }
        }
        
    }
})

export const {addPost, removePost, addSinglePost} = posts.actions;
export default posts.reducer