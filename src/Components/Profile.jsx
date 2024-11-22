import { useDispatch, useSelector } from "react-redux"
import appStore from "../Utilities/store"
import { ProfileEditForm } from "./ProfileEditForm"
import axios from "axios"
import { backendBaseUrl } from "../Utilities/constants"
import { useEffect } from "react"
import { addUser } from "../Utilities/loggedInUserSlice"

export const Profile = () =>{

    const userx = useSelector(appStore=>appStore.user)
    
    return (
       <>{userx &&<ProfileEditForm user={userx}/>}</>
    )
}