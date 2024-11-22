import axios from "axios";
import { backendBaseUrl } from "../Utilities/constants";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Utilities/loggedInUserSlice";
import appStore from "../Utilities/store";
import { useNavigate } from "react-router-dom";

export const Login = () =>{

    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [error, setError] = useState("");
    const[loginToast, setLoginToast] = useState(false);
    const[loginStatus, setLoginStatus] = useState(true);


    const logInRequest = async() =>{
        try{
            setError("");
            const result = await axios.post(`${backendBaseUrl}/login`, {email,password}, {withCredentials:true});
            setLoginToast(true);
            dispatch(addUser(result.data.user));
            setTimeout(()=>{
                return navigator("/")
            },1500)
            
        }catch(err){
            navigator("/login")
            setError(err.response.data.error);
        }
    }


    setTimeout(()=>{
        return setLoginToast(false);
    },3000)
    
    const[fName,setFName] = useState("Srijan");
    const[lName, setLName] = useState("Sinha");
    const[email,setEmail] = useState("srijan@gmail.com");
    const[password, setPassword] = useState("k8dfh8c@Pfv0gB");
    const[phoneNumber,setPhno] = useState("98087768765");
    const[age, setAge] = useState("23");
    const[gender,setGender] = useState("male");
    const[photoUrl, setPhotoUrl] = useState("");
    
    return (
        <>
        {loginToast && <div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Logged in</span>
            </div>
        </div>}
            {<div className="w-4/12 mx-auto my-24">
            <div className="card bg-base-200 w-96 shadow-xl p-10">
            {loginStatus? <span>Log in</span> : <span>Sign up</span>}
            <label className="input input-bordered flex items-center gap-2 my-10">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" className="grow" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input type="password" className="grow" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </label>
                <div className="card-body items-center text-center">
                {error && <p className="text-red-500">{error}</p>}
                    <div className="card-actions">
                    <button className="btn btn-primary" onClick={logInRequest}>{loginStatus?"Log in": "Sign up"}</button>
                    </div>
                    <div onClick={()=>setLoginStatus(!loginStatus)}>{loginStatus? <span>New user? sign up here</span> : <span>Already registered? login here</span>}</div>
                </div>
            </div>
            </div>}
        </>
    )
}





