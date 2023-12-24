import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../toDo/todo.css";
import "../../componentes/amazon/product.css";
const Login = () => {
  const [user, setUser] = useState({
    gmail: "",
    password: "",
    lastName: "",
    firstName: "",
  });
  const [whichForm, setWhichForm] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const navigate = useNavigate();
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

    if (forgotPass) {
      alert("Ckeck Your Email Account For Link");
      emptyForm();
      return axios
        .get(
          `${process.env.REACT_APP_LOGIN_API_KEY}?gmail=${user.gmail}&forgot=forgot`
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (whichForm) {
      axios
        .post(`${process.env.REACT_APP_LOGIN_API_KEY}`, user)
        .then((result) => {
          console.log(result);
          sessionStorage.setItem("x-token", result.headers["x-token"]);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
      emptyForm();
    } else {
      axios
        .get(
          `${process.env.REACT_APP_LOGIN_API_KEY}?gmail=${user.gmail}&password=${user.password}`
        )
        .then((result) => {
          console.log(result);
          sessionStorage.setItem("x-token", result.headers["x-token"]);
          navigate("/");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  const setForm = (val) => {
    if (val == "signup") {
      setWhichForm(true);
      emptyForm();
    } else if (val == "Login") {
      setWhichForm(false);
      emptyForm();
    } else {
      console.log("forgot");
    }
  };

  const forgetPassword = () => {
    setForgotPass(true);
  };
  return (
    <div className="m65">
      <div
        className="search-containt"
        style={{ backgroundColor: "#fff", width: "40%" }}
      >
        <form onSubmit={formEvent}>
          <div className="dFlex alignCenter">
            {!forgotPass ? (
              <>
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
                  style={{
                    borderBottom: whichForm ? "5px solid #1f76ce" : "none",
                  }}
                >
                  Signup
                </h2>
              </>
            ) : (
              <>
                <h2>Forgot Password</h2>
                <button onClick={() => setForgotPass(false)}>Back</button>
              </>
            )}
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
            type="email"
            onChange={eventChange}
            name="gmail"
            value={user.gmail}
            placeholder="Gmail"
            required
          />
          {!forgotPass && (
            <>
              <label>Password</label>
              <input
                type="text"
                onChange={eventChange}
                name="password"
                value={user.password}
                placeholder="password"
              />
            </>
          )}
          {!whichForm && !forgotPass && (
            <p className="m0 anchor" onClick={forgetPassword}>
              Forgot Password
            </p>
          )}
          {!whichForm && forgotPass && (
            <p className="m0">
              Write that <span style={{ color: "red" }}>Gmail</span> which you
              used to creacte account
            </p>
          )}
          <button style={{ marginTop: 5 }} className="btn">
            {!forgotPass && <span>{!whichForm ? "Login" : "signup"}</span>}
            {forgotPass && <span>Go</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
