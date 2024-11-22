import { useDispatch, useSelector } from "react-redux"
import appStore from "../Utilities/store"
import axios from "axios"
import { backendBaseUrl } from "../Utilities/constants"
import { removeUser } from "../Utilities/loggedInUserSlice"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export const Navbar = () =>{
    const userData = useSelector(appStore=>appStore.user);
    const dispatch = useDispatch();
    const navigator = useNavigate();


    const handleLogout = async() =>{
        try{
            const result = await axios.post(`${backendBaseUrl}/user/logout`,{},{withCredentials:true});
            dispatch(removeUser());
            navigator("/login")
        }catch(err){    
            console.log(err);
        }
    }
    return (
        <>
            {userData && <div className="navbar bg-base-300">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">DEV-Overflow</Link>
                </div>
            <div className="flex-none">
                <p className="text-sm me-4">{userData.fName}</p>
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={userData.photoUrl} />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><Link to="/profile" className="justify-between">Profile</Link></li>
                    <li><Link to="/createpost" className="justify-between">Create Post</Link></li>
                    <li onClick={handleLogout}><Link>Logout</Link></li>
                </ul>
                </div>
            </div>
        </div>}
        </>
    )
}