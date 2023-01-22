import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const onSubmitChange = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:4000/posts", {
      title: title,
    });

    setTitle(""); // this is to make sure to empty input box once after entering text
  };
  return (
    <div>
      <form onSubmit={onSubmitChange}>
        <div className="form-group mb-3">
          <label className="form-label">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">SUBMIT</button>
      </form>
    </div>
  );
};

export default PostCreate;
