import React, { useEffect, useState } from "react";

const GoToTop = () => {
  const [topBtn, setTopBtn] = useState(false);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setTopBtn(true);
      } else {
        setTopBtn(false);
      }
    });
  }, []);

  return (
    <>
      {topBtn && (
        <div className="upDownPosition label" onClick={goToTop}>
          <img className="upDown" src="images/up.png" />
        </div>
      )}
    </>
  );
};

export default GoToTop;
