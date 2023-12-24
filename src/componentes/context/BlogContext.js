import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const BlogValue = createContext();

const BlogContext = ({ children }) => {
  const [blogArr, setBlogArr] = useState([]);
  const [bolg, setBlog] = useState({});
  const [editedbolgID, setEditedbolgID] = useState(null);
  const [bolgEdited, setBolgEdited] = useState(false);
  const callApi = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BLOG_API_KEY}`);
    setBlogArr(res.data.data);
    console.log(res.data, "dataaaa");
    console.log(1234567);
  };

  useEffect(() => {
    callApi();
  }, [bolg]);

  return (
    <BlogValue.Provider
      value={{
        blogArr,
        setBlogArr,
        bolg,
        setBlog,
        bolgEdited,
        setBolgEdited,
        editedbolgID,
        setEditedbolgID,
        callApi,
      }}
    >
      {children}
    </BlogValue.Provider>
  );
};

export default BlogContext;
