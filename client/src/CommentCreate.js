import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: content,
    });
    setContent("");
  };
  return (
    <div>
      <form onSubmit={onSubmitHandle}>
        <div className="form-group mb-3">
          <label>New Comment</label>
          <input
            value={content}
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
