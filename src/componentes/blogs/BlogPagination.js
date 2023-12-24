import React, { useContext, useState, useRef } from "react";
import { BlogValue } from "../context/BlogContext";
import { UpperCase } from "../reuseComp/UpperCase";
import Pagination from "@mui/material/Pagination";
import RedMore from "../reuseComp/RedMore";
import axios from "axios";
const BlogPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openRedMore, setOpenRedMore] = useState(false);
  const [text, setText] = useState(null);
  const dragStart = useRef(null);
  const dragEnter = useRef(null);
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
  const pageChange = (e, pageNumber) => {
    console.log(blogArr.length);
    console.log(currentPage * 3 - 3, currentPage * 3);
    setCurrentPage(pageNumber);
  };

  const editHandle = (id) => {
    const editedBlog = blogArr.filter((val, i) => {
      if (val._id == id) {
        return val;
      }
    });
    setBolgEdited(true);
    setEditedbolgID(id);
    setBlog(...editedBlog);
  };

  const deleteHandle = (id) => {
    // const deletedBlog = blogArr.filter((val, i) => {
    //   if (val.id != id) {
    //     return val;
    //   }
    // });
    // setBlogArr(deletedBlog);
    axios
      .delete(`${process.env.REACT_APP_BLOG_API_KEY}${id}`)
      .then((res) => {
        console.log(res);
        callApi();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openModel = (textVal) => {
    setText(textVal);
    setOpenRedMore(!openRedMore);
  };

  const dragEnd = () => {
    const __blogArr = [...blogArr];
    __blogArr.splice(dragStart.current, 1);
    __blogArr.splice(dragEnter.current, 0, blogArr[dragStart.current]);
    setBlogArr(__blogArr);
    console.log(dragStart.current, dragEnter.current);
  };
  return (
    <div>
      {openRedMore && <RedMore text={text} setOpenRedMore={setOpenRedMore} />}
      <div className="l_parent" style={{ marginBottom: 100 }}>
        {Array.isArray(blogArr) &&
          blogArr.length > 0 &&
          blogArr
            .slice(currentPage * 12 - 12, currentPage * 12)
            .map((mapVal, i) => {
              return (
                <div
                  className="card bg"
                  key={i}
                  draggable
                  onDragStart={(e) => (dragStart.current = i)}
                  onDragEnter={(e) => (dragEnter.current = i)}
                  onDragEnd={dragEnd}
                >
                  <div
                    className="dFlex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <h2>{mapVal?.title}</h2>
                    <img src="images/directions.png" height={30} width={30} />
                  </div>
                  <p>{mapVal?.description.slice(0, 100)}</p>
                  {mapVal?.description.length > 100 ? (
                    <button
                      className="redMoreBtn"
                      onClick={() => openModel(mapVal?.description)}
                    >
                      Red More
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    className="editBtn"
                    onClick={() => editHandle(mapVal._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => deleteHandle(mapVal._id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
      </div>
      <div className="pagination">
        <Pagination
          count={Math.ceil(blogArr.length / 12)}
          color="primary"
          onChange={(e, pageNumber) => pageChange(e, pageNumber)}
        />
      </div>
    </div>
  );
};

export default React.memo(BlogPagination);
