import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../../assest/virtusa.png";
import "./topbar.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const TopBar = () => {
  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(url);
  };
  return (
    <div className="top-bar">
      <div className="logo">
        <img
          src={logo}
          alt="Company Logo"
        />
      </div>
      <label className="backto-home" onClick={() => navigate("/")}>
      <i className="fas fa-home"></i>
    </label>
    </div>
  );
};

export default TopBar;
