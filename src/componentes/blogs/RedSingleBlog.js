import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogValue } from "../context/BlogContext";
import GoToTop from "../reuseComp/GoToTop";

const RedSingleBlog = () => {
  const { blogArr } = useContext(BlogValue);
  const [showBlog, setShowBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const singleBlog = blogArr.filter((val, i) => {
      if (val.id == id) {
        return val;
      }
    });
    setShowBlog(...singleBlog);
  }, []);
  return (
    <div className="m65">
      <GoToTop />
      <h1>{showBlog.title}</h1>
      <p>{showBlog.description}</p>
      <h4>Writer {showBlog.writer}</h4>
    </div>
  );
};

export default RedSingleBlog;
