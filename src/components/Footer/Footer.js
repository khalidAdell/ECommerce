import React from "react";
import "./Footer.css";

const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
  return <div className="footer">Khalid &copy;{year} All Rights Reseved</div>;
};

export default Footer;
