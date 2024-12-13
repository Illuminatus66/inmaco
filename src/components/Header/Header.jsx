import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserName, logout } from "../../reducers/adminSlice";
import { clearAllInvoices } from "../../reducers/invoiceSlice";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector(selectUserName);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearAllInvoices())
    navigate("/", { replace: true });
  };

  return (
    <header className="header">
      <div className="header-left">INMACO</div>
      <div className="header-center"></div> {/* For future use */}
      <div className="header-right">
        {admin && <span className="welcome-text">Welcome {admin}!</span>}
        {admin && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
