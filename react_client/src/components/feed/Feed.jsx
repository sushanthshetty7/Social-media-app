import React, { useContext, useEffect, useState } from "react";
import Post from "../post/post";
import Share from "../share/share";
import "./Feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
// import { Posts } from '../../Dummy'

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const resp = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        resp.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      // console.log(resp.data)
    };
    fetchPost();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share/>}
        {posts.map((P) => (
          <Post key={P._id} post={P} />
        ))}
      </div>
    </div>
  );
}
