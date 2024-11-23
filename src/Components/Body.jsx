import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import axios from "axios"
import { backendBaseUrl } from "../Utilities/constants"
import { useDispatch, useSelector } from "react-redux"
import appStore from "../Utilities/store"
import { addUser } from "../Utilities/loggedInUserSlice"
import { addPost } from "../Utilities/PostSlice"
import { useEffect } from "react"

export const Body = () => {
    const dispatch = useDispatch();
    const user = useSelector(appStore=>appStore.user);
    const getLoggedInUser = async() =>{
        if(user) return
        try{
            const user = await axios.get(`${backendBaseUrl}/user/getloggedinuser`,{withCredentials:true});
            dispatch(addUser(user.data.user))
        }catch{
            console.log(err);
        }
    }
    
    useEffect(()=>{
        getLoggedInUser();
    },[])
    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}