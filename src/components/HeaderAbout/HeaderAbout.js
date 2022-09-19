import React from "react";
import "./HeaderAbout.css";

function HeaderAbout(props) {
  return <p className="header-about">{props.text}</p>;
}

export default HeaderAbout;
