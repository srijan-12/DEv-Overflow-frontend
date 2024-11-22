import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const PostCard = ({post}) =>{
    const {title,postImgUrl,_id,userId,likes,comment} = post;
    const[isOwner, setIsOwner] = useState(false);


    const user = useSelector(appStore=>appStore.user)
    const loggedInUserId = user._id;
    const postId = _id;
    const checkValidUser =(loggedInUserId,userId) =>{
        if(loggedInUserId === userId){
            setIsOwner(true)
        }
    }
    useEffect(()=>{
        checkValidUser(loggedInUserId,userId);
    },[])
    
    return(
        <div className="w-5/12 mx-auto my-10 mb-20" onClick={()=>handleCardUpdate(_id)}>
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

                {likes? <p className="text-lg">{likes.length}<i className="fa-regular fa-heart text-lg mx-2 cursor-pointer"></i></p>:<p className="text-lg">0<i className="fa-regular fa-heart text-lg  cursor-pointer"></i></p>}

                {comment? <p className="text-lg">{comment.length}<i className="fa-regular fa-comment text-lg mx-2 cursor-pointer"></i></p>:<p className="text-lg">0<i className="fa-regular fa-comment text-lg mx-2  cursor-pointer"></i></p>}

                {isOwner && <><i className="fa-solid fa-pen-to-square text-lg"></i>

                <i className="fa-solid fa-trash text-lg"></i></>}
                </div>
            </div>
        </div>}
        </div>
    )
}