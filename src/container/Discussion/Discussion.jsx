import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "../../components/Comment/Comment";
import FullComment from "../../components/FullComment/FullComment";
import NewComment from "../../components/NewComment/NewComment";
import { toast } from 'react-toastify';
import "./discussion.css";

const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [selectetId, setSelectedId] = useState(null);
  const [error, setError] = useState(false);
  // how to get data ?
  // 1.useEffect () => http
  // 2.CDM => get data

  useEffect(() => {
    // axios
    //   .get("https://jsonplaceholder.typicode.com/comments")
    //   .then((response) => {
    //     console.log(response);
    //     setComments(response.data.slice(0, 4));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    const getComments = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/comments");
        setComments(data);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    getComments();
  }, []);

  const selectedCommenthandler = (id) => {
    setSelectedId(id);
  };

  const renderComments = () => {
    let renderData = <p>Loading ...</p>;

    if (error) {
      renderData = <p>fetching data feild !</p>;
      toast.error("fetching data feild !",{
        theme: "colored"
      });
    }

    if (comments && !error) {
      renderData = comments.map((c) => (
        <Comment
          key={c.id}
          name={c.name}
          email={c.email}
          onClick={() => selectedCommenthandler(c.id)}
        />
      ));
      toast.success("get comments succesfully",{
        theme: "colored"
      })
    }

    return renderData;
  };

  return (
    <main>
      <section>{renderComments()}</section>
      <section>
        <FullComment selectetId={selectetId} />
      </section>
      <section>
        <NewComment setComments={setComments} />
      </section>
    </main>
  );
};

export default Discussion;
