import React from "react";
import { Link } from "react-router-dom";

import "../css/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>
        <Link to={"/"}>
          <img src="https://cdn.cardume.digital/public/sites/saperx/images/logos/logo-saperx-top.svg"></img>
        </Link>
      </h2>
      <ul>
        <li>
          <Link to={"/"}> Home </Link>
        </li>
        <li>
          <Link to={"/new"} className="new-btn">
            Cadastro
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
