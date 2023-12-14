import React, { useEffect, useContext, useState, Fragment } from "react";
import { BlogValue } from "../context/BlogContext";
import Togle from "../reuseComp/Togle";
import { useNavigate } from "react-router-dom";
import GoToTop from "../reuseComp/GoToTop";
const Blogs = () => {
  const { blogArr, callApi } = useContext(BlogValue);
  const [catLength, setCatLength] = useState([]);
  const [expandCol, setExpandCol] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    callApi();
    document.title = "Blogs";
    const category = blogArr.map((val, i) => {
      return val.category;
    });

    const uniq = [...new Set(category)];
    setCatLength(uniq);
  }, []);

  const SingleCat = ({ category }) => {
    return (
      <div className="dFlex mlr10 flexWrap justify-between">
        {Array.isArray(blogArr) &&
          blogArr.length > 0 &&
          blogArr
            .filter((val, i) => {
              if (val.category == category) {
                return val;
              }
            })
            .map((val, i) => {
              return (
                <div
                  className="card bg hover"
                  onClick={() => {
                    navigate(`${val._id}`);
                  }}
                  key={i}
                >
                  <h2>{val.title}</h2>
                  <p className="mb2">
                    {val.description.substr(0, 130)}
                    {val.description.length > 100 ? "......" : ""}
                  </p>
                  <p className="m0">Writer:- {val.writer}</p>
                </div>
              );
            })}
      </div>
    );
  };

  // main Blogs
  return (
    <div className="m65">
      <GoToTop />
      <div className="m10">
        <span className="label" onClick={() => setExpandCol(!expandCol)}>
          {expandCol ? "Collaps All" : "Expand All"}
        </span>
      </div>
      {Array.isArray(catLength) &&
        catLength.length > 0 &&
        catLength?.map((val, i) => {
          return (
            <Fragment key={i}>
              <Togle category={val} index={i} expandCol={expandCol}>
                <SingleCat category={val} />
              </Togle>
            </Fragment>
          );
        })}
    </div>
  );
};

export default Blogs;
