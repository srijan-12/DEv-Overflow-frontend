import axios from "axios"
import { backendBaseUrl } from "../Utilities/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../Utilities/loggedInUserSlice"
import appStore from "../Utilities/store"
import { Login } from "./login"

export const Feed = () =>{
    const dispatch = useDispatch();
    const user = useSelector(appStore=>appStore.user)
    const loginUser = async() =>{
        const userInfo = await axios.get(`${backendBaseUrl}/user/getloggedinuser`,{withCredentials:true})
        dispatch(addUser(userInfo.data.user));
    }
    useEffect(()=>{
        loginUser();
    },[])
    return(
        <>{user? <>This is feed page</> : <Login/>}</>
    )
}