import { useState } from "react"
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
export const ProfileEditForm = ({user}) =>{
    const[fName, setFName] = useState(user.fName)
    const[lName, setLName] = useState(user.lName)
    const[email, setEmail] = useState(user.email)
    const[phoneNumber, setPhoneNo] = useState(user.phoneNumber)
    const[age, setAge] = useState(user.age)
    const[gender, setGender] = useState(user.gender)
    const[photoUrl, setPhotoURL] = useState(user.photoUrl)
    

    return(
        <>
        {<div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Profile updated.</span>
            </div>
        </div>}
            <div className="flex m-20 justify-around">
                {user && <div className="card bg-base-200 w-4/12 h-full shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Edit your profile</h2>
                        <div>
                                <div className="flex flex-col">
    
                                    <input id="username" placeholder="First Name" className="p-3 rounded-xl w-10/12 m-4" value={fName} onChange={(e)=>setFName(e.target.value)}/>
    
    
                                    <input id="password" placeholder="Last Name" className="p-3 rounded-xl w-10/12 m-4" value={lName} onChange={(e)=>setLName(e.target.value)}/>
    
    
                                    <input id="username" placeholder="Phone Number" className="p-3 rounded-xl w-10/12 m-4" value={phoneNumber} onChange={(e)=>setPhoneNo(e.target.value)}/>
                                    <input id="username" placeholder="email" className="p-3 rounded-xl w-10/12 m-4 disabled" value={email}/>
    
                                    <input id="password" placeholder="Age" className="p-3 rounded-xl w-10/12 m-4" value={age} onChange={(e)=>setAge(e.target.value)}/>
    
    
                                    <select className="select select-secondary p-3 rounded-xl w-10/12 m-4" value={gender} onChange={(e)=>setGender(e.target.value)}>
                                    <option disabled value="">Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
    
    
                                    <input id="password" placeholder="Photo URL" className="p-3 rounded-xl w-10/12 m-4" value={photoUrl} onChange={(e)=>setPhotoURL(e.target.value)}/>
                                </div>
                                <div className="card-actions justify-start ms-5 flex flex-col justify-center">
                                    <button className="btn btn-primary w-3/12 mt-2">Save</button>
                                </div>
                        </div>
                    </div>      
                </div>}
    
    
    
    
                <div className="card bg-base-300 w-96 shadow-xl">
                    <figure>
                        <img
                        src={photoUrl}
                        alt="User Profile" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                        {fName} {lName}
                        <div className="badge badge-secondary">{age}</div>
                        <div className="badge badge-primary">{gender}</div>
                        </h2>
                    </div>
                </div>
    
    
            </div>
            </>
        )

   
}





