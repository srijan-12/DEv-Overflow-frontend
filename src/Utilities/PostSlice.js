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
        },
        removeSinglePost : (state, action) =>{
            const newArr = state.filter((p)=> p._id.toString() == action.payload);
            return newArr;
        }
        
    }
})

export const {addPost, removePost, addSinglePost, removeSinglePost} = posts.actions;
export default posts.reducer