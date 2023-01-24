import http from "../../services/httpServices";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./newComment.css";

const NewComment = ({ setComments }) => {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    body: "",
  });

  const commentHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const createCommentHandler = () => {
    http
      .post("/comments", comment)
      .then((res) => http.get("/comments"))
      .then((res) => {
        setComments(res.data);
        toast.success("add comment successfull", { theme: "colored" });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="newComment">
      <h2>Add new comment</h2>
      <div className="formControll">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={commentHandler} />
      </div>
      <div className="formControll">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={commentHandler} />
      </div>
      <div className="formControll">
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id=""
          cols="21"
          rows="3"
          onChange={commentHandler}
        ></textarea>
      </div>
      <button onClick={createCommentHandler}>add new comment</button>
    </div>
  );
};

export default NewComment;
