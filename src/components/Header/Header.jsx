import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserName, logout } from "../../reducers/adminSlice";
import { clearAllInvoices } from "../../reducers/invoiceSlice";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const admin = useSelector(selectUserName);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearAllInvoices())
  };

  return (
    <header className="header">
      <div className="header-left">INMARCO</div>
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
