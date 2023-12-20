import React, { useEffect, useState } from "react";
import axios from "axios";
const Login = () => {
  const [user, setUser] = useState({
    gmail: "",
    password: "",
    lastName: "",
    firstName: "",
  });
  const [whichForm, setWhichForm] = useState(false);

  const eventChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const emptyForm = () => {
    setUser({
      gmail: "",
      password: "",
      lastName: "",
      firstName: "",
    });
  };

  const formEvent = (e) => {
    e.preventDefault();
    if (whichForm) {
      axios
        .post("http://localhost:9999/user", user)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      emptyForm();
    } else {
      axios
        .get(`http://localhost:9999/user?gmail=${user.gmail}`)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("login");
    }
  };

  const setForm = (val) => {
    if (val == "signup") {
      setWhichForm(true);
      emptyForm();
    } else {
      setWhichForm(false);
      emptyForm();
    }
  };

  return (
    <div className="m65">
      <div className="search-containt" style={{ backgroundColor: "#fff" }}>
        <form onSubmit={formEvent}>
          <div className="dFlex alignCenter">
            <h2
              onClick={() => setForm("Login")}
              style={{
                borderBottom: !whichForm ? "5px solid #1f76ce" : "none",
                marginRight: 10,
              }}
            >
              Login &nbsp;
            </h2>
            <h2
              onClick={() => setForm("signup")}
              style={{ borderBottom: whichForm ? "5px solid #1f76ce" : "none" }}
            >
              Signup
            </h2>
          </div>
          {whichForm ? (
            <>
              <label>firstName</label>
              <input
                type="text"
                onChange={eventChange}
                name="firstName"
                placeholder="firstName"
                value={user.firstName}
              />
              <label>lastName</label>
              <input
                type="text"
                onChange={eventChange}
                name="lastName"
                value={user.lastName}
                placeholder="lastName"
              />
            </>
          ) : (
            ""
          )}
          <label>Gmail</label>
          <input
            type="text"
            onChange={eventChange}
            name="gmail"
            value={user.gmail}
            placeholder="Gmail"
          />
          <label>Password</label>
          <input
            type="text"
            onChange={eventChange}
            name="password"
            value={user.password}
            placeholder="password"
          />
          <button style={{ marginTop: 5 }} className="btn">
            {!whichForm ? "Login" : "signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
