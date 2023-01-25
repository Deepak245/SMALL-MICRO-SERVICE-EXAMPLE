import React from "react";

const CommentList = ({ comments }) => {
  // this is all commented as we are directly getting cmments for the PostList component
  // const [comments, setComments] = useState([]);
  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );
  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  // this is all commented as we are directly getting cmments for the PostList component

  //now here we want to change code in such a way if comment is rejected we want to show something else this li code should be rendered.
  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "pending") {
      content = "This Comment is Awaiting Moderation";
    }
    if (comment.status === "rejected") {
      content = "This Content has been Rejected";
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
