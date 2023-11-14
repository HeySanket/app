import React, { useEffect, useState } from "react";
import "./Togle.css";
import { UpperCase } from "./UpperCase";
const Togle = (props) => {
  const [showHide, setShowHide] = useState(false);

  const down = <img className="upDown" src="images/down.png" />;
  const up = <img className="upDown" src="images/up.png" />;
  useEffect(() => {
    setShowHide(props.expandCol);
  }, [props.expandCol]);

  return (
    <div className="m10">
      <div
        className={`t_header ${showHide && "abc"}`}
        onClick={() => setShowHide(!showHide)}
      >
        <h3 className="m0">
          {props.index + 1}:-&nbsp;
          {UpperCase(props.category)}
        </h3>
        {showHide ? up : down}
      </div>
      {showHide && <div className="p10">{props.children}</div>}
    </div>
  );
};

export default Togle;
