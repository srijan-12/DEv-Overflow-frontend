import {configureStore} from "@reduxjs/toolkit"
import  loggedInUserSlice  from "./loggedInUserSlice.js";
const appStore = configureStore({
    reducer:{
        user : loggedInUserSlice
    }
})
export default appStore;