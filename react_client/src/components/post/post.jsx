import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
// import { Users } from "../../Dummy";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PIBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContext)


  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])

  useEffect(() => {
    const FetchUser = async () => {
      const resp = await axios.get(`/user?userId=${post.userId}`);
      setUser(resp.data);
    };
    FetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopleft">
            <Link to={`profile/${user.username}`}>
              <img
                src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                alt="img"
                className="postProfileImage"
              />
            </Link>

            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopright">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} alt="img" className="postImage" />
        </div>
        <div className="postBottom">
          <div className="postBottomleft">
            <img
              src={`${PF}like.png`}
              alt="like"
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}heart.png`}
              alt="heart"
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
