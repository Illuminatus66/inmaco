import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions";
import { selectUserError } from "../../reducers/adminSlice";
import "./LoginPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectUserError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const clientTime = new Date().toISOString();
    const loginData = { username, password, clientTime };
    dispatch(login({ loginData, navigate }));
  };

  return (
    <div className="login-page">
      <Header />
      <div className="login-box">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Username: admin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password: adminpassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Sign In</button>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
