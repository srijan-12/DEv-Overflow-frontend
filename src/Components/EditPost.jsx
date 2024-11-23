import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import appStore from "../Utilities/store";
import { backendBaseUrl } from "../Utilities/constants";
import axios from "axios";
import { addPost } from "../Utilities/PostSlice";


export const EditPost = () =>{
    const dispatch = useDispatch();
    const[error,setError] = useState("");
    const[toastActive, setToastActive] = useState(false)
    const navigator = useNavigate();
    const{id} = useParams()
    const fetchPosts = async() =>{
        try{
            const posts = await axios.get(`${backendBaseUrl}/post/getallposts`,{withCredentials:true})
            const postsArray = posts.data.allPost;
            dispatch(addPost(postsArray))
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        fetchPosts();
    },[])
    const postArray = useSelector(appStore=>appStore.post);
    let thatPost;
    if(postArray){
        thatPost = postArray.find((p)=>p._id.toString() == id);
    }
    const[title,setTitle] = useState("");
    const[photoUrl,setPhotoURL] = useState(""); 

    useEffect(() => {
        if (thatPost) {
            setTitle(thatPost.title || "");
            setPhotoURL(thatPost.postImgUrl || "");
        }
    }, [thatPost]);


    const handleUpdate = async() =>{
        try{
            setError("")
            const result = await axios.patch(`${backendBaseUrl}/post/updatepost/${id}`,{title,photoUrl},{withCredentials:true})
            setToastActive(true);
            setTimeout(()=>{setToastActive(false)},1500)
            setTimeout(()=>{navigator("/")},2500);
        }catch(err){
            setError(err.response.data.error)
        }
    }

    return(
        <>
        {toastActive && <div className="toast toast-top toast-center">
            <div className="alert alert-info">
                <span>Post Updated</span>
            </div>
        </div>}
        <div className="w-4/12 mx-auto my-24">
            <div className="card bg-base-200 w-96 shadow-xl p-10">
                <h1 className="font-bold text-xl">Update Post</h1>
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
                        <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}