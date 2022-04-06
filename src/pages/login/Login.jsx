import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/authRedux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(signIn({ username, password }));
      if (res.type === "auth/login/fulfilled") {
        await Cookies.set("token", res.payload.accessToken, { expires: 3 });
        await navigate("/");
        await window.location.reload();
      }
    } catch (error) {}
  };
  return (
    <div className="container">
      <input
        className="input"
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" type="submit" onClick={handleLogin}>
        LOGIN
      </button>
    </div>
  );
};

export default Login;
