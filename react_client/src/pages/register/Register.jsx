import axios from "axios";
import React, { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("password doesn't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social</h3>
          <span className="LoginDisc">
            connect with friends around you on social
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              type="text"
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="loginInput"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              type="password"
              minLength="6"
              className="loginInput"
            />
            <input
              placeholder="Confirm Password"
              required
              ref={passwordAgain}
              type="password"
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>

            <button className="loginRegister">Log into your Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
