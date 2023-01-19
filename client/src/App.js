import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
export default () => {
  return (
    <div className="container">
      <h1>Create Your Post</h1>
      <PostCreate />
      <hr />
      <h1>POSTS</h1>
      <PostList />
    </div>
  );
};
