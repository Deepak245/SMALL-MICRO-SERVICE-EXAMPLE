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

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
