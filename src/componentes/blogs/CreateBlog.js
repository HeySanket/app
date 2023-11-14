import React, { useContext, useEffect, useState } from "react";
import { BlogValue } from "../context/BlogContext";
import BlogPagination from "./BlogPagination";

const CreateBlog = () => {
  const {
    blogArr,
    setBlogArr,
    bolg,
    setBlog,
    bolgEdited,
    setBolgEdited,
    editedbolgID,
    setEditedbolgID,
  } = useContext(BlogValue);
  const [hideShoeForm, setHideShoeForm] = useState(true);
  const down = <img className="upDown" src="images/down.png" />;
  const up = <img className="upDown" src="images/up.png" />;

  const changeEvent = (e) => {
    const { name, value } = e.target;
    if (bolgEdited) {
      setBlog({
        ...bolg,
        [name]: value,
      });
    } else {
      setBlog({
        ...bolg,
        [name]: value,
        id: new Date().getTime().toString(),
      });
    }
  };
  const formEvent = (e) => {
    e.preventDefault();
    if (bolgEdited) {
      const newArr = blogArr.map((val, i) => {
        return val.id == editedbolgID ? bolg : val;
      });
      setBlogArr(newArr);
    } else {
      setBlogArr([...blogArr, bolg]);
      setBlog({ title: "", description: "", category: "", writer: "" });
    }
  };

  const formHideShoe = () => {
    setHideShoeForm(!hideShoeForm);
  };
  useEffect(() => {
    document.title = "Create To Do";
    window.addEventListener("resize", () => {
      if (window.innerWidth > 600) {
        setHideShoeForm(true);
      } else {
        setHideShoeForm(false);
      }
    });
    if (window.innerWidth < 600 && hideShoeForm) {
      setHideShoeForm(false);
    }
  }, []);
  return (
    <div style={{ marginTop: 50 }} className="t_parent">
      <div className="r_shadow">
        <div className="r_width">
          <form className="todoForm m10" onSubmit={formEvent}>
            <div>
              <div className="dFlex">
                <input
                  name="title"
                  placeholder="Title"
                  type="text"
                  value={bolg.title}
                  onChange={changeEvent}
                />
                <span className="searchBtn" onClick={() => formHideShoe()}>
                  {hideShoeForm ? up : down}
                </span>
              </div>
              {hideShoeForm && (
                <div>
                  <textarea
                    rows="6"
                    name="description"
                    type="text"
                    value={bolg.description}
                    placeholder="Description"
                    className="d_block textarea"
                    onChange={changeEvent}
                  ></textarea>
                  <input
                    name="category"
                    type="text"
                    placeholder="Category"
                    value={bolg.category}
                    className="d_block"
                    onChange={changeEvent}
                  />
                  <input
                    name="writer"
                    placeholder="Writer Name"
                    type="text"
                    value={bolg.writer}
                    className="d_block"
                    onChange={changeEvent}
                  />
                  <button className="btn" type="submit">
                    {bolgEdited ? "Edit" : "Create"}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div>{blogArr.length > 0 && <BlogPagination />}</div>
    </div>
  );
};

export default CreateBlog;
