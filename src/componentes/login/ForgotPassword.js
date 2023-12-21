import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ForgotPassword = () => {
  const [userPassword, setUserPassword] = useState({
    newPassword: "",
    ConfirmNewPassword: "",
  });
  const [urlParams, setUrlParams] = useSearchParams();
  const [gamil, setGmail] = useSearchParams();

  const eventChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({ ...userPassword, [name]: value });
  };
  useEffect(() => {
    setGmail(urlParams.get("gamil"));
  }, []);

  const formEvent = (e) => {
    e.preventDefault();

    if (gamil) {
      axios
        .put(
          `https://appbe.up.railway.app/forgotPassword?gmail=${gamil}`,
          userPassword
        )
        .then((result) => {
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
    console.log(userPassword);
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
