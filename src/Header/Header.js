import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { liVal } from "./liVal";
const Header = () => {
  const [show, setShow] = useState(false);
  const [setHideShowscroll, setSetHideShowscroll] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();
  const [path, setPath] = useState(null);

  useEffect(() => {
    setPath(sessionStorage.getItem("x-token"));
    if (!sessionStorage.getItem("x-token")) {
      navigate("/login");
    }
  }, [location.pathname]);

  const logOut = () => {
    sessionStorage.removeItem("x-token");
    navigate("/login");
  };

  const UlVal = (mobileId) => {
    const link = (value, i) => {
      return (
        <NavLink
          className="link"
          to={`/${value.link.toLocaleLowerCase()}`}
          onClick={() => {}}
          key={i}
        >
          <label htmlFor={mobileId == "mobileId" ? "show" : "abc"}>
            {value.name}
          </label>
        </NavLink>
      );
    };
    return (
      <ul>
        {liVal.map((value, i) => {
          return (
            <>
              {path && value.name != "Login" && link(value, i)}
              {!path && value.name == "Login" && link(value, i)}
            </>
          );
        })}
        {path && (
          <leble style={{ color: "red" }} className="link" onClick={logOut}>
            logOut
          </leble>
        )}
      </ul>
    );
  };
  const burgur = <span>&#9776;</span>;
  const cross = <span>&#10006;</span>;

  useEffect(() => {
    if (setHideShowscroll) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 600) {
        setSetHideShowscroll(false);
      }
    });
  }, [setHideShowscroll]);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setSetHideShowscroll(true);
    }
  }, []);
  return (
    <>
      <div className="parent">
        <div className="logoP">
          <div className="label">
            <span
              onClick={() => {
                navigate("/");
              }}
              className="dFlex"
              style={{ alignItems: "center" }}
            >
              <img
                src="images/app16.png"
                width={35}
                height={35}
                style={{ marginLeft: "5px" }}
              />
              App
            </span>
          </div>
        </div>
        <input type="checkbox" id="show" style={{ display: "none" }} />
        <label
          className="close pr10"
          htmlFor="show"
          onClick={() => {
            setShow(!show);
            setSetHideShowscroll(true);
          }}
        >
          {show ? burgur : burgur}
        </label>
        <div className="mb">
          <label
            className="close"
            htmlFor="show"
            onClick={() => {
              setShow(!show);
              setSetHideShowscroll(false);
            }}
          >
            {show ? cross : cross}
          </label>
          {UlVal("mobileId")}
        </div>

        <section className="mb2">{UlVal()}</section>
      </div>
    </>
  );
};

export default Header;
