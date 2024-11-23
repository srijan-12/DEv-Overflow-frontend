import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backendBaseUrl } from "../Utilities/constants";
import {Link, useNavigate} from "react-router-dom"
import { removeSinglePost } from "../Utilities/PostSlice";

export const PostCard = ({post}) =>{
    const {title,postImgUrl,_id,userId,likes,comment} = post;
    const[isOwner, setIsOwner] = useState(false);
    const[postLike, setPostLike] = useState(likes.length);
    const[likeRed, setLikeRed] = useState(false);
    const[showComment, setShowComment] = useState(false);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const user = useSelector(appStore=>appStore.user)
    const loggedInUserId = user._id;
    const postId = _id;
    
    const checkValidUser =(loggedInUserId,userId) =>{
        if(loggedInUserId === userId){
            setIsOwner(true)
        }
    }

    const handleLike = async(postId) =>{
        try{
            const result = await axios.post(`${backendBaseUrl}/like/liked/${postId}`,{},{withCredentials:true})
            console.log(result);
            if(result.data.status === "liked"){
                setLikeRed(true)
                console.log("true")
            }else if(result.data.status === "unliked"){
                setLikeRed(false);
                console.log("false")
            }
            setPostLike(result.data.result.likes.length);
        }catch(err){
            console.log(err);
        }
    }

    const handleComment = async(postId)=>{
        //yet to do via populate in db
    }

    const handleDelete = async(postId)=>{
        try{
            console.log(postId);
            const result = await axios.delete(`${backendBaseUrl}/post/deletepost/${postId}`,{withCredentials:true});
            console.log(result);
            dispatch(removeSinglePost(postId));
            navigator("/")
        }catch(err){
            console.log(err);
        }
    }


    useEffect(()=>{
        checkValidUser(loggedInUserId,userId);
    },[])
    
    return(
        <div className="w-5/12 mx-auto my-10 mb-20">
        {post && <div className="card bg-base-200 h-[400px] shadow-xl">
            {postImgUrl && <figure className="mt-8">
                <img
                src={postImgUrl}
                alt="Movie" 
                className="w-10/12"
                />
            </figure>}
            <div className="card-body">
                <h2 className="card-title">{title}</h2>

                <div className="card-actions my-6 justify-around">

                    <div onClick={()=>handleLike(postId)}>
                        {<p>{postLike}<i className={`fa-regular fa-heart text-lg mx-2 cursor-pointer ${likeRed ? "text-red-500" : "text-white-500"}`}></i></p>}
                    </div>

                    <div onClick={()=>handleComment(postId)}>
                        {comment? <p className="text-lg">{comment.length}<i className="fa-regular fa-comment text-lg mx-2 cursor-pointer"></i></p>:<p className="text-lg">0<i className="fa-regular fa-comment text-lg mx-2  cursor-pointer"></i></p>}
                    </div>

                {isOwner && <>
                <div><Link to={`/updatepost/${postId}`}><i className="fa-solid fa-pen-to-square text-lg"></i></Link></div>

                <div onClick={()=>handleDelete(postId)}><i className="fa-solid fa-trash text-lg"></i></div>
                </>}
                </div>
            </div>
        </div>}
        </div>
    )
}