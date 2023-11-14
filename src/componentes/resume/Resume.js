import React, { useEffect } from "react";

const Resume = () => {
  useEffect(() => {
    document.title = "Resume";
  }, []);
  return (
    <div className="m65 search-containt  grow grow1">
      <img src="images/working.png" />
    </div>
  );
};

export default Resume;
