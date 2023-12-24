import React from "react";
import "./skeleton.css";
const Skeleton = () => {
  return (
    <div class="box l_parent">
      <div class="skeleton">
        <div class="skeleton-left">
          <div class="line h17 w40 m10"></div>
          <div class="line"></div>
          <div class="line h8 w50"></div>
          <div class="line  w75"></div>
        </div>
        <div class="skeleton-right">
          <div class="square"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
