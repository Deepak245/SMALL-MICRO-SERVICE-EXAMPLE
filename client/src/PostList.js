import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({}); // remember here we tempted to put array but remember from the backend we are returning object from posts.

  const fetchPost = async () => {
    // const res = await axios.get("http://localhost:4000/posts");//commented this line once quer service got ready.
    //once below change is done we are getting all the dat from query list and in side itself post have all the data embedded.
    //so in cmmentList again we are doing axios call to get comments related to post . now we can avoid its a post from query itself is returning all data.
    //so remove the postid prop from comment list and directly pass the comment from axios call.
    const res = await axios.get("http://localhost:4002/posts");
    // console.log(res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  //   console.log(posts);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          {/* <CommentList postId={post.id} /> */}
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  }); // objects.values is built in method to convert object to array.

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;

//adding to pull in git
