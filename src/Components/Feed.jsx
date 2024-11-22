import axios from "axios"
import { backendBaseUrl } from "../Utilities/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../Utilities/loggedInUserSlice"
import appStore from "../Utilities/store"
import { Login } from "./login"
import { addPost } from "../Utilities/PostSlice"
import { useNavigate } from "react-router-dom"
import { PostCard } from "./PostCard"

export const Feed = () =>{
    const dispatch = useDispatch();
    const user = useSelector(appStore=>appStore.user)
    const navigator = useNavigate();
    const loginUser = async() =>{
        try{
            const userInfo = await axios.get(`${backendBaseUrl}/user/getloggedinuser`,{withCredentials:true})
            dispatch(addUser(userInfo.data.user));
        }catch(err){
            console.log(err);
            navigator("/login")
        }
    }
    const fetchPosts = async() =>{
        try{
            const posts = await axios.get(`${backendBaseUrl}/post/getallposts`,{withCredentials:true})
            const postsArray = posts.data.allPost;
            dispatch(addPost(postsArray))
        }catch(err){
            console.log(err.message);
        }
    }

    const handleCardUpdate = async(id)=>{
        console.log(id);
    }

    useEffect(()=>{
        loginUser();
        fetchPosts();
    },[])
    const postsArray = useSelector(appStore=>appStore.post);
    if(postsArray == null) return <h1>Something went wrong</h1>
    if(postsArray <=0) return <h1 className="text-center text-bold text-3xl">No more users to add</h1>
    return( 
    <>
        {postsArray != null && postsArray.map((p)=><PostCard post = {p} key={p._id} />)}
    </>
    )
}