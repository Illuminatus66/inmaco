import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions";
import { selectUserError, selectUserLoading } from "../../reducers/adminSlice";
import "./LoginPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectUserError);
  const loading = useSelector(selectUserLoading);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dots, setDots] = useState("");

  // Animating dots during loading
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
      }, 500); // Update dots every 500ms
      return () => clearInterval(interval);
    }
    setDots(""); // Reset dots when not loading
  }, [loading]);

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
          placeholder="Username is admin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password is adminpassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? `Wait a minute${dots}` : "Sign In"}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
