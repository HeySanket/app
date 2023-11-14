import React, { useContext, useState } from "react";
import { BlogValue } from "../context/BlogContext";
import { UpperCase } from "../reuseComp/UpperCase";
import Pagination from "@mui/material/Pagination";
import RedMore from "../reuseComp/RedMore";
const BlogPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openRedMore, setOpenRedMore] = useState(false);
  const [text, setText] = useState(null);
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
  const pageChange = (e, pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const editHandle = (id) => {
    const editedBlog = blogArr.filter((val, i) => {
      if (val.id == id) {
        return val;
      }
    });
    setBolgEdited(true);
    setEditedbolgID(id);
    setBlog(...editedBlog);
  };
  const deleteHandle = (id) => {
    const deletedBlog = blogArr.filter((val, i) => {
      if (val.id != id) {
        return val;
      }
    });
    setBlogArr(deletedBlog);
  };
  const openModel = (textVal) => {
    setText(textVal);
    setOpenRedMore(!openRedMore);
  };

  return (
    <div>
      {openRedMore && <RedMore text={text} setOpenRedMore={setOpenRedMore} />}
      <div className="l_parent">
        {Array.isArray(blogArr) &&
          blogArr
            .slice(currentPage * 3 - 3, currentPage * 3)
            .map((mapVal, i) => {
              return (
                <div className="card bg" key={i}>
                  <h2>{UpperCase(mapVal?.title)}</h2>
                  <p>{mapVal?.description.slice(0, 100)}</p>
                  {mapVal?.description.length > 100 ? (
                    <button
                      className="editBtn"
                      onClick={() => openModel(mapVal?.description)}
                    >
                      Red More
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    className="editBtn"
                    onClick={() => editHandle(mapVal.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => deleteHandle(mapVal.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
      </div>
      <Pagination
        count={Math.ceil(blogArr.length / 3)}
        color="primary"
        onChange={(e, pageNumber) => pageChange(e, pageNumber)}
      />
    </div>
  );
};

export default React.memo(BlogPagination);
