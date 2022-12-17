import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuList } from "../utils/constants";
import "../App.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink exact to={url} activeClassName="active">
          {title}
        </NavLink>
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <nav>
      <div onClick={handleTitleClick} className="logo">
        OnlineShopping<font>AI</font>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={clicked ? "menu-list" : "menu-list close"}>{menuList}</ul>
    </nav>
  );
};

export default Navbar;
