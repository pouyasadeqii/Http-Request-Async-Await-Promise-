import React, { useEffect, useState } from "react";
import http from "../../services/httpServices";
import "./fullComment.css";

const FullComment = ({ selectetId }) => {
  const [comment, setComment] = useState(null);

  useEffect(() => {
    if (selectetId) {
      http
        .get(`/comments/${selectetId}`)
        .then((res) => setComment(res.data))
        .catch();
    }
  }, [selectetId]);

  let commentDetail = <p>Please select a comment !</p>;

  if (selectetId) commentDetail = <p>Loading ...</p>;

  if (comment) {
    commentDetail = (
      <div className="fullComment">
        <p>{comment.name}</p>
        <p>{comment.email}</p>
        <p>{comment.body}</p>
      </div>
    );
  }

  return commentDetail;
};

export default FullComment;
