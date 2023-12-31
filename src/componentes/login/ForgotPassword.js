import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [userPassword, setUserPassword] = useState({
    newPassword: "",
    ConfirmNewPassword: "",
  });
  const [urlParams, setUrlParams] = useSearchParams();
  const [gmail, setGmail] = useSearchParams();

  const eventChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({ ...userPassword, [name]: value });
  };
  useEffect(() => {
    setGmail(urlParams.get("gmail"));
    sessionStorage.setItem("gmail", urlParams.get("gmail"));
    console.log(urlParams.get("gmail"));
  }, []);
  const formEvent = (e) => {
    e.preventDefault();

    if (gmail) {
      axios
        .put(
          `${process.env.REACT_APP_FORGOTPASS_API_KEY}?gmail=${gmail}`,
          userPassword
        )
        .then((result) => {
          navigate("/login");
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setUserPassword({
      newPassword: "",
      ConfirmNewPassword: "",
    });
  };

  return (
    <div className="m65">
      <div
        className="search-containt"
        style={{ backgroundColor: "#fff", width: "40%" }}
      >
        <form onSubmit={formEvent}>
          <div className="dFlex alignCenter">
            <h2>Forgot Password</h2>
          </div>
          <label htmlFor="NewPassword">New Password</label>
          <input
            id="NewPassword"
            name="newPassword"
            type="text"
            onChange={eventChange}
            value={userPassword.newPassword}
            placeholder="New Password"
          />
          <label htmlFor="ConfirmNewPassword">Confirm New Password</label>
          <input
            type="text"
            id="ConfirmNewPassword"
            name="ConfirmNewPassword"
            onChange={eventChange}
            value={userPassword.ConfirmNewPassword}
            placeholder="Confirm New Password"
          />
          <button style={{ marginTop: 5 }} className="btn">
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
