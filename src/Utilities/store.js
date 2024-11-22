import {configureStore} from "@reduxjs/toolkit"
import  loggedInUserSlice  from "./loggedInUserSlice.js";
import postReducers from "./PostSlice.js";
const appStore = configureStore({
    reducer:{
        user : loggedInUserSlice,
        post : postReducers
    }
})
export default appStore;