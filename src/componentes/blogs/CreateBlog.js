import React, { useContext, useEffect, useState } from "react";
import { BlogValue } from "../context/BlogContext";
import BlogPagination from "./BlogPagination";
import axios from "axios";
import "../../App.css";
import "../../toDo/todo.css";
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
    callApi,
  } = useContext(BlogValue);
  const [hideShoeForm, setHideShoeForm] = useState(true);
  const [validation, setValidation] = useState({
    title: false,
    description: false,
    category: false,
    writer: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    description: "",
    category: "",
    writer: "",
  });
  const [btnDisable, setBtnDisable] = useState(true);
  const down = <img className="upDown" src="images/down.png" />;
  const up = <img className="upDown" src="images/up.png" />;

  const changeEvent = (e) => {
    const { name, value } = e.target;
    checkValidation(name, value);
    if (bolgEdited) {
      setBlog({
        ...bolg,
        [name]: value,
      });
    } else {
      setBlog({
        ...bolg,
        [name]: value,
      });
    }
  };

  const errorMsgA = (name, value, text) => {
    setErrorMsg({ ...errorMsg, [name]: text });
    setValidation({ ...validation, [name]: value });
  };

  const checkValidation = (name, value) => {
    switch (name) {
      case "title":
        {
          if (value.length == "") {
            errorMsgA(name, true, "it should not empty");
            setBtnDisable(true);
          } else if (value.length < 5) {
            errorMsgA(name, true, "length should be more then 5");
            setBtnDisable(true);
          } else {
            errorMsgA(name, false, "");
            setBtnDisable(false);
          }
        }
        break;
      case "writer":
        {
          if (value.length == "") {
            errorMsgA(name, true, "it should not empty");
            setBtnDisable(true);
          } else if (value.length < 5) {
            errorMsgA(name, true, "length should be more then 5");
            setBtnDisable(true);
          } else {
            errorMsgA(name, false, "");
            setBtnDisable(false);
          }
        }
        break;
      case "description":
        {
          if (value == "") {
            errorMsgA(name, true, "it should not empty");
            setBtnDisable(true);
          } else if (value.length < 10) {
            errorMsgA(name, true, "length should be more then 10");
            setBtnDisable(true);
          } else {
            errorMsgA(name, false, "");
            setBtnDisable(false);
          }
        }
        break;
      case "category":
        {
          if (value == "") {
            errorMsgA(name, true, "it should not empty");
            setBtnDisable(true);
          } else {
            errorMsgA(name, false, "");
            setBtnDisable(false);
          }
        }
        break;
    }
  };

  const formEvent = (e) => {
    e.preventDefault();
    console.log(bolg);
    if (bolgEdited) {
      axios
        .put(`${process.env.REACT_APP_BLOG_API_KEY}${editedbolgID}`, bolg)
        .then((res) => {
          console.log(res);
          callApi();
        })
        .catch((error) => {
          console.log(error);
          alert("All field required");
        });
      setBlog({ title: "", description: "", category: "", writer: "" });
      setBolgEdited(false);
    } else {
      setBlogArr([...blogArr, bolg]);
      setBlog({ title: "", description: "", category: "", writer: "" });

      axios
        .post(`${process.env.REACT_APP_BLOG_API_KEY}`, bolg)
        .then((res) => {
          console.log(res);
          callApi();
        })
        .catch((error) => {
          console.log(error);
          alert("All field required");
        });
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
              {validation.title && (
                <span className="error">{errorMsg.title}</span>
              )}
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
                  {validation.description && (
                    <span className="error">{errorMsg.description}</span>
                  )}
                  <select
                    name="category"
                    value={bolg.category}
                    onChange={changeEvent}
                  >
                    <option>Select</option>
                    <option>Food blogs</option>
                    <option>Travel blogs</option>
                    <option>Lifestyle blogs</option>
                    <option>Photography blogs</option>
                    <option>Personal blogs</option>
                    <option>Parenting blogs</option>
                    <option>Music blogs</option>
                    <option>Business blogs</option>
                    <option>Sports blogs</option>
                    <option>Movie blogs</option>
                  </select>
                  {validation.category && (
                    <span className="error">{errorMsg.category}</span>
                  )}

                  <input
                    name="writer"
                    placeholder="Writer Name"
                    type="text"
                    value={bolg.writer}
                    className="d_block"
                    onChange={changeEvent}
                  />
                  {validation.writer && (
                    <span className="error">{errorMsg.writer}</span>
                  )}
                  <button
                    disabled={btnDisable}
                    className={`btn ${btnDisable && "btnDisable"}`}
                    type="submit"
                  >
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
