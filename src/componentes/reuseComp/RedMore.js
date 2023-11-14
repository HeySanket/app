import React from "react";
import ReactDOM from "react-dom";

const RedMore = ({ text, setOpenRedMore }) => {
  return ReactDOM.createPortal(
    <>
      <div className="modal-warper" onClick={() => setOpenRedMore(false)}></div>
      <div className="modal-containt" style={{ overflowY: "scroll" }}>
        <div style={{ textAlign: "right" }}>
          <img
            onClick={() => setOpenRedMore(false)}
            src="images/close.png"
            alt="Close"
            className="label"
          />
        </div>
        {text}
      </div>
    </>,
    document.getElementById("portel")
  );
};

export default RedMore;
