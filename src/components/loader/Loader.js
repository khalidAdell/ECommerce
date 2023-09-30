import React from "react";
import ReactDOM from "react-dom";
import "./Loader.css";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <span className="loader"></span>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
