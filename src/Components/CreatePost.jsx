import axios from "axios"
import { backendBaseUrl } from "../Utilities/constants"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addSinglePost } from "../Utilities/PostSlice"
import {useNavigate} from "react-router-dom"

export const CreatePost = () =>{
    const dispatch = useDispatch();
    const[title,setTitle] = useState("");
    const[photoUrl,setPhotoURL] = useState("");
    const[error,setError] = useState("");
    const[toastActive, setToastActive] = useState(false)
    const navigator = useNavigate();
    const createPost = async()=>{
        try{
            const result = await axios.post(`${backendBaseUrl}/post/createpost`,{title,photoUrl},{withCredentials:true})
            setToastActive(true);
            setTimeout(()=>{setToastActive(false)},1500);
            dispatch(addSinglePost(result.data.post))
            setTimeout(()=>{navigator("/");},2000);

        }catch(err){
            console.log(err.response.data.err);
            setError(err.response.data.err)
        }
    }
    return(
        <>
        {toastActive && <div className="toast toast-top toast-center">
            <div className="alert alert-info">
                <span>Post created</span>
            </div>
        </div>}
        <div className="w-4/12 mx-auto my-24">
            <div className="card bg-base-200 w-96 shadow-xl p-10">
                <label className="input input-bordered flex items-center gap-2 my-4">
                    <input
                        type="text"
                        className="grow"
                        placeholder="What's on your mind"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-4">
                    <input
                        type="text"
                        className="grow"
                        placeholder="image url"
                        value={photoUrl}
                        onChange={(e)=>setPhotoURL(e.target.value)}/>
                </label>
                <div className="card-body items-center text-center">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="card-actions items-center">
                        <button className="btn btn-primary" onClick={createPost}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}